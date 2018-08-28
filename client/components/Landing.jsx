import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import PropTypes from 'prop-types';
import SummaryPanel from './SummaryPanel.jsx';
import ServiceMenu from './ServiceMenu.jsx';
import LeftPanel from './LeftPanel.jsx'


const leftWindow = {
  width: '50%',
  float: 'left',
};

const rightWindow = {
  width: '40%',
  marginLeft: '5%',
  height: '70%',
  float: 'left',
  border: '1px solid #ccc',
  borderRadius: '10px',
};

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.serviceHandler = this.serviceHandler.bind(this);
    this.next = this.next.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.makeAppointment = this.makeAppointment.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setView = this.setView.bind(this);

    this.state = {
      hours: '8:00am-8:00pm',
      services: [],
      selectedServices: [],
      appointments: [],
      rbcAppointments: [],
      view: 2,
      address: '1426 3rd Ave',
      city: 'Oakland',
      state: 'CA',
      zip: '94606',
      startTime: '',
      startDate: moment().format('YYYY-MM-DD'),
      isCartEmpty: true,
      isFormEmpty: true,
      totalPrice: 0,
      currentView: 'week',
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/api/provider/appointments',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        this.setState({ appointments: data }, () => {
          this.RBCformating();
        });
      },
    });

    $.ajax({
      url: 'http://localhost:3000/api/provider/services',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        data.forEach((service) => {
          service.quantity = 0;
        });
        this.setState({ services: data });
      },
    });
  }

  setDate(startDate) {
    this.setState({ startDate });
  }

  setView(key, value) {
    this.setState({ [key]: value });
  }

  makeAppointment() {
    const {
      services, startTime, startDate, address, city, state, zip,
    } = this.state;

    const appointmentInfo = {
      service_id: [],
      duration: '0',
      start_time: startTime,
      start_date: `${startDate}`,
      address,
      city,
      state,
      zip,
    };

    services.forEach((service) => {
      if (service.quantity > 0) {
        const multipleServices = appointmentInfo.service_id.concat(Array(service.quantity).fill(service.id));
        appointmentInfo.service_id = multipleServices;
        appointmentInfo.duration = `${Number(appointmentInfo.duration) + Number(service.setup) + Number(service.duration) + Number(service.cleanup)}`;
      }
    });

    appointmentInfo.service_id = JSON.stringify(appointmentInfo.service_id);

    $.ajax({
      url: 'http://localhost:3000/api/provider/appointments',
      method: 'POST',
      data: appointmentInfo,
      dataType: 'json',
      success: (data) => {
        if (data) {
          this.componentDidMount();
          this.setState({ view: 3 });
        }
      },
    });
  }

  RBCformating() {
    const { appointments } = this.state;
    const rbcAppointments = [];

    const convertStartTime = (stupidDate, stupidTime) => {
      const parsedDate = stupidDate.split('T')[0].split('-');
      parsedDate[0] = Number(parsedDate[0]);
      parsedDate[1] = Number(parsedDate[1]) - 1;
      parsedDate[2] = Number(parsedDate[2]);

      const parsedTime = stupidTime.split(':');
      parsedTime[0] = Number(parsedTime[0]);
      parsedTime[1] = Number(parsedTime[1]);
      return parsedDate.concat(parsedTime.concat([0, 0]));
    };

    const convertEndTime = (stupidDate, time, duration) => {
      const newTime = moment(time, 'HH:mm').add(Number(duration), 'm').format('HH:mm').split(':');
      newTime[0] = Number(newTime[0]);
      newTime[1] = Number(newTime[1]);
      const parsedDate = stupidDate.split('T')[0].split('-');
      parsedDate[0] = Number(parsedDate[0]);
      parsedDate[1] = Number(parsedDate[1]) - 1;
      parsedDate[2] = Number(parsedDate[2]);
      return parsedDate.concat(newTime.concat([0, 0]));
    };

    appointments.forEach((appt) => {
      const newEvent = {};
      newEvent.id = appt.id;
      newEvent.title = `Client ${appt.client_id}`;
      newEvent.desc = `Services: ${appt.service_id}`;
      newEvent.allDay = false;
      newEvent.start = new Date(...convertStartTime(appt.start_date, appt.start_time));
      newEvent.end = new Date(...convertEndTime(appt.start_date, appt.start_time, appt.duration));
      newEvent.address = appt.address;
      newEvent.city = appt.city;
      newEvent.state = appt.state;
      newEvent.zip = appt.zip;
      rbcAppointments.push(newEvent);
    });

    this.setState({ rbcAppointments });
  }

  evaluateServiceSelections() {
    const { services } = this.state;
    const selected = [];
    let sum = 0;
    let emptyCart = true;

    services.forEach((service, index) => {
      if (service.quantity > 0) {
        const mutatedService = service;
        mutatedService.index = index;
        selected.push(mutatedService);
        sum += Number(service.price) * service.quantity;
        emptyCart = false;
      }
    });

    this.setState({
      totalPrice: sum,
      isCartEmpty: emptyCart,
      selectedServices: selected,
    });
  }

  isFormFilled() {
    let emptyForm = true;
    const {
      address, city, state, zip,
    } = this.state;
    if (address.length > 0 && city.length > 0 && state.length > 0 && zip.length > 0) {
      emptyForm = false;
    }
    this.setState({ isFormEmpty: emptyForm });
  }

  serviceHandler(e) {
    const { services } = this.state;
    const mutableService = services;
    const target = JSON.parse(e.target.value);
    if (target[0] === '+') {
      mutableService[target[1]].quantity += 1;
    }
    if (target[0] === '-' && mutableService[target[1]].quantity > 0) {
      mutableService[target[1]].quantity -= 1;
    }
    this.setState({ services: mutableService }, () => {
      this.evaluateServiceSelections();
    });
  }

  formHandler(e) {
    const field = e.target.name;
    const target = e.target.value;
    this.setState({ [field]: target });
  }

  next() {
    const { view } = this.state;
    this.setState({ view: view + 1 }, () => {
      this.isFormFilled();
    });
  }

  render() {
    const {
      hours, services, selectedServices, appointments, view, address, city, state, zip,
      startTime, startDate, isCartEmpty, isFormEmpty, totalPrice, currentView, rbcAppointments,
    } = this.state;

    if (view !== 3) {
      return (
        <div>
          <div id="leftPanel" style={leftWindow}>
            <LeftPanel
              services={services}
              serviceHandler={this.serviceHandler}
              view={view}
              address={address}
              city={city}
              state={state}
              zip={zip}
              formHandler={this.formHandler}
              startDate={startDate}
              appointments={appointments}
              rbcAppointments={rbcAppointments}
              hours={hours}
              currentView={currentView}
              setView={this.setView}
            />
          </div>
          <div id="rightPanel" style={rightWindow}>
            <SummaryPanel
              serviceSummary={services}
              selectedServices={selectedServices}
              serviceHandler={this.serviceHandler}
              makeAppointment={this.makeAppointment}
              next={this.next}
              setDate={this.setDate}
              view={view}
              address={address}
              city={city}
              state={state}
              zip={zip}
              isCartEmpty={isCartEmpty}
              isFormEmpty={isFormEmpty}
              totalPrice={totalPrice}
              startDate={startDate}
              startTime={startTime}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2>Confirmation</h2>
        <h3>Services</h3>
        {selectedServices.map((service, index) => (
            <div key={service.id.toString() + " " + index.toString()}>
              {service.quantity}
              {' '}
                x
              {' '}
              {service.name}
            </div>
          ))}
          Total: $
          {totalPrice}
        <h3>Time</h3>
        <div>
          @ :
          {startTime}
          <br />
          on :
          {startDate}
          <br/>
        </div>
        <h3>Address</h3>
        <div>
          Address:
          {address}
          <br />
          City:
          {city}
          <br />
          State:
          {state}
          <br />
          Zip:
          {zip}:
          <br />
        </div>
      </div>
    )
  }
}

export default Landing;
