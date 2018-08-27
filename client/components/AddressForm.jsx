import React from 'react';

const addressShell = {
  width: '95%',
  height: '55%',
  fontSize: '20px',
  borderRadius: '10px',
  padding: '5%',
  fontFamily: 'Helvetica',
  backgroundColor: '#b19cd9',
  color: 'white',
  marginTop: '10px',
};

const inputStyle = {
  width: '100%',
  fontSize: '12.5px',
  padding: '6px 10px',
  margin: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
};

const AddressForm = (props) => {
  const {
    address, city, state, zip, formHandler,
  } = props;
  return (
    <div>
      <br />
      <br />
      <div style={addressShell}>
        <h3>Confirm Address</h3>
        <div>
          Street Address*
          <input id="address" onChange={formHandler} style={inputStyle}  name="address" value={address} />
        </div>
        <div>
          City*
          <input id="city" onChange={formHandler} style={inputStyle}   name="city" value={city} />
        </div>
        <div>
          State*
          <input id="state" onChange={formHandler} style={inputStyle}  name="state" value={state} />
        </div>
        <div>
          Zip*
          <input id="zip" onChange={formHandler} style={inputStyle}  name="zip" value={zip} />
        </div>
        <br />
        <br />
        *Required Field
      </div>
    </div>
  );
};

export default AddressForm;
