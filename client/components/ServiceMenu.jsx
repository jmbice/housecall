import React from 'react';
// import PropTypes from 'prop-types';

const serviceWrapper = {
  width: '100%',
  fontSize: '14px',
  borderRadius: '10px',
  padding: '10px',
  fontFamily: 'Helvetica',
  backgroundColor: '#b19cd9',
  color: 'white',
  marginTop: '10px',
  marginLeft: '2.5%',
};

const serviceButtons = {
  width: '30%',
  float: 'left',
  marginLeft: '12%',
  fontSize: '20px',
  fontWeight: '600',
  background: 'lightBlue',
  color: 'white',
  padding: '5px',
  borderRadius: '5px',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const ServiceMenu = (props) => {
  const { services, serviceHandler, count } = props;

  return (
    <div>
      <h3>Select your desired service or services:</h3>
      {services.map((service, index) => (
        <div key={service.id} style={serviceWrapper}>
          <p>{service.name}</p>
          <p>Description: {service.description}</p>
          <p>Duration: {service.duration}</p>
          <p>Price: ${service.price}</p>
          <p>Quantity selected: {service.quantity}</p>
          <option style={serviceButtons} value={`["-", ${index}]`} onClick={serviceHandler}>-</option>
          <option style={serviceButtons} value={`["+", ${index}]`} onClick={serviceHandler}>+</option>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default ServiceMenu;
