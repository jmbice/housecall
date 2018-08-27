import React from 'react';
import ServiceMenu from './ServiceMenu.jsx';

const LeftPanel = (props) => {
  const { view, services, serviceHandler } = props;
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
  return (
    <div>
      hello
    </div>
  );
};

export default LeftPanel;
