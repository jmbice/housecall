import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import PropTypes from 'prop-types';
import ServiceMenu from './ServiceMenu.jsx';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.serviceHandler = this.serviceHandler.bind(this);

    this.state = {
      hours: '8:00am-8:00pm',
      services: [],
      existingAppointments: [],
      view: 0,
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/provider/appointments',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        this.setState({ existingAppointments: data });
      },
    });

    $.ajax({
      url: 'http://localhost:3000/provider/services',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        data.forEach((e) => {
          e.quantity = 0;
        });
        this.setState({ services: data });
      },
    });
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
    this.setState({ services: mutableService });
  }

  render() {
    const {
      hours, services, existingAppointments,
    } = this.state;
    return (
      <div>
        <div>
          <h1>Hello Cake</h1>
          <p>
            Your providers&apos;s appointments are:
            {' '}
            {JSON.stringify(existingAppointments)}
          </p>
          <p>
            You have selected:
            {' '}
            {JSON.stringify(services)}
          </p>
        </div>
        <div id="summary">
          <h3>
            Services selected:
              {services.map((e) => {
                if (e.quantity > 0){
                  <div key={e.id.toString()}>
                    You requested {e.quantity} of {e.name}.
                  </div>
                }
              });
          </h3>
        </div>
        <div id="serviceMenu">
          <ServiceMenu
            services={services}
            serviceHandler={this.serviceHandler}
          />
        </div>
      </div>
    );
  }
}

export default Landing;
