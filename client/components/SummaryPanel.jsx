import React from 'react';
// import PropTypes from 'prop-types';

const summary = {
  padding: '10%',
  paddingLeft: '15%',
};

const summaryServiceButtons = {
  width: '5%',
  float: 'right',
  fontSize: '10px',
  background: 'lightBlue',
  color: 'white',
  padding: '5px',
  borderRadius: '5px',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const nextButton = {
  fontFamily: 'helvetica',
  fontSize: '20px',
  background: 'lightBlue',
  color: 'white',
  marginTop: '11%',
  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const buttonWrapper = {
  width: '100px',
  marginLeft: '-8%',
};

const SummaryPanel = (props) => {
  const {
    serviceHandler, next, address, city, state, zip, view,
    makeAppointment, totalPrice, isCartEmpty,
    isFormEmpty, selectedServices
  } = props;

  let buttonOrCue;
  const addressSummary = (
    <div>
      <h3>
        Address:
      </h3>
      Street:
      {' '}
      {address}
      <br/>
      City:
      {' '}
      {city}
      <br/>
      State:
      {' '}
      {state}
      <br/>
      Zip:
      {' '}
      {zip}
      <br/>
    </div>
  );


  if (view === 0 && isCartEmpty) {
    buttonOrCue = (
      <p>Select something from the menu!</p>
    );
  } else if (view === 0 && !isCartEmpty) {
    buttonOrCue = (
      <div style={nextButton} onClick={next}> Next</div>
    );
  } else if (view === 1 && isFormEmpty) {
    buttonOrCue = (
      <div>
        {addressSummary}
        <p>Input your address!</p>
      </div>
    );
  } else if (view === 1 && !isFormEmpty) {
    buttonOrCue = (
      <div>
        {addressSummary}
        <div style={nextButton} onClick={next}> Next</div>
      </div>
    );
  } else if (view === 2) {
    buttonOrCue = (
      <div>
        {addressSummary}
        <div style={nextButton} onClick={makeAppointment}> Make Appointment </div>
      </div>
    )
  }

  return (
    <div style={summary}>
      <h3>
        Services selected:
      </h3>
      <div>
        {selectedServices.map((service, index) => (
          <div key={service.id.toString()+":"+index.toString()}>
            {service.quantity}
            {' '}
              x
            {' '}
            {service.name}
            {' '}
              for
            {' '}
            {service.duration}
            {' '}
              minutes.
            <div style={buttonWrapper}>
              <option style={summaryServiceButtons} value={`["-", ${service.index}]`} onClick={serviceHandler}>-</option>
              <option style={summaryServiceButtons} value={`["+", ${service.index}]`} onClick={serviceHandler}>+</option>
            </div>
            <br />
            <br />
          </div>
        ))}
        Total: $
        {totalPrice}
      </div>
      {buttonOrCue}

    </div>
  );
};

export default SummaryPanel;
