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

    this.state = {
      hours: '8:00am-8:00pm',
      services: [],
      appointments: [],
      view: 0,
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/provider/appointments',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        this.setState({ appointments: data });
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

  next() {
    const { view } = this.state;
    this.setState({ view: view + 1 });
  }

  render() {
    const {
      hours, services, appointments, view,
    } = this.state;

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
            You have these appointments:
            {' '}
            {JSON.stringify({appointments})}
          </p>
        </div>
        <div id="leftPanel" style={leftWindow}>
          <LeftPanel
            services={services}
            serviceHandler={this.serviceHandler}
            view={view}
          />
        </div>
        <div id="rightPanel" style={rightWindow}>
          <SummaryPanel
            serviceSummary={services}
            serviceHandler={this.serviceHandler}
            next={this.next}
          />
        </div>
      </div>
    );
  }
}

export default Landing;
