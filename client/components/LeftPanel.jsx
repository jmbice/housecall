import React from 'react';
import ServiceMenu from './ServiceMenu.jsx';
import AddressForm from './AddressForm.jsx';

const LeftPanel = (props) => {
  const {
    view, services, serviceHandler, address, city, state, zip, formHandler,
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
    return (
      <div>
        Hello World
      </div>
    )
  }
};

export default LeftPanel;
