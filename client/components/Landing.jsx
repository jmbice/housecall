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

    this.state = {
      hours: '8:00am-8:00pm',
      services: [],
      selectedServices: [],
      appointments: [],
      view: 0,
      address: '123',
      city: 'Berkeley',
      state: 'CA',
      zip: '94606',
      startTime: '14:00',
      startDate: '2018-09-02',
      isCartEmpty: true,
      isFormEmpty: true,
      totalPrice: 0,
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/api/provider/appointments',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        this.setState({ appointments: data });
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
      hours, services, selectedServices, appointments, view, address, city, state, zip, startTime, startDate, isCartEmpty, isFormEmpty, totalPrice,
    } = this.state;

    if (view !== 3) {
      return (
        <div>
          <div>
            <h1>Hello Cake</h1>
            <p>
              Your providers&apos;s hours are:
              {' '}
              {JSON.stringify(hours)}
              {view}
            </p>
            <p>
              Your providers&apos;s services are:
              {' '}
              {JSON.stringify(services)}
              {view}

            </p>
            <p>
              You have these appointments:
              {' '}
              {JSON.stringify({ appointments })}
            </p>
          </div>
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
            />
          </div>
          <div id="rightPanel" style={rightWindow}>
            <SummaryPanel
              serviceSummary={services}
              selectedServices={selectedServices}
              serviceHandler={this.serviceHandler}
              makeAppointment={this.makeAppointment}
              next={this.next}
              view={view}
              address={address}
              city={city}
              state={state}
              zip={zip}
              isCartEmpty={isCartEmpty}
              isFormEmpty={isFormEmpty}
              totalPrice={totalPrice}
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
