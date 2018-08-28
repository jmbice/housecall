import React from 'react';
import ServiceMenu from './ServiceMenu.jsx';
import AddressForm from './AddressForm.jsx';
import TimePicker from './TimePicker.jsx';

const LeftPanel = (props) => {
  const {
    view, services, serviceHandler, address, city, state, zip,
    formHandler, startDate, appointments, hours, currentView, setView, rbcAppointments,
  } = props;

  if (view === 0) {
    return (
      <div>
        <ServiceMenu
          services={services}
          serviceHandler={serviceHandler}
        />
      </div>
    );
  }

  if (view === 1) {
    return (
      <div>
        <AddressForm
          formHandler={formHandler}
          address={address}
          city={city}
          state={state}
          zip={zip}
        />
      </div>
    );
  }

  if (view === 2) {
    // rbcAppointments.push({
    //   id: 6,
    //   title: 'Meeting',
    //   start: new Date(2018, 7, 29, 10, 30, 0, 0),
    //   end: new Date(2018, 7, 29, 12, 30, 0, 0),
    //   desc: 'Pre-meeting meeting, to prepare for the meeting',
    // });

    return (
      <div>
        <TimePicker
          startDate={startDate}
          appointments={appointments}
          rbcAppointments={rbcAppointments}
          hours={hours}
          currentView={currentView}
          setView={setView}
          address={address}
          city={city}
          state={state}
          zip={zip}
        />
      </div>
    );
  }
};

export default LeftPanel;
