import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import PropTypes from 'prop-types';

const summary = {
  padding: '5%',
  paddingLeft: '10%',
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
    isFormEmpty, selectedServices, setDate, startDate, startTime
  } = props;

  let rightNow = moment();
  if (startDate) {
    rightNow = moment(startDate);
  }
  let isFocused = true;
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

  const datePicker = (
    <div>
      <SingleDatePicker
        date={rightNow}
        onDateChange={(date) => {
          setDate(moment(date).format('YYYY-MM-DD'));
        }}
        focused={rightNow}
        onFocusChange={({ focused }) => console.log('Focus changed to:', focused)}
        id={`${address}, ${city}, ${state}, ${Math.random(10000)}`}
        orientation="vertical"
        numberOfMonths={1}
        verticalHeight={400}
      />
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
  } else if (view === 2 && !startTime && !startDate) {
    buttonOrCue = (
      <div>
        {addressSummary}
        <br />
        {datePicker}
      </div>
    );
  } else if (view === 2 && !startTime && startDate) {
    buttonOrCue = (
      <div>
        {addressSummary}
        <br />
        {datePicker}
        <div style={nextButton} onClick={makeAppointment}> Make Appointment </div>
      </div>
    );
  } else if (view === 2 && startTime && startDate) {
    buttonOrCue = (
      <div>
        {addressSummary}
        <br />
        {datePicker}
        <div style={nextButton} onClick={makeAppointment}> Make Appointment </div>
      </div>
    );
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
