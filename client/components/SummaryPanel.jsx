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
  width: '50%',
  fontSize: '30px',
  background: 'lightBlue',
  color: 'white',
  padding: '5px',
  borderRadius: '5px',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const buttonWrapper = {
  width: '100px',
  marginLeft: '-8%',
};

const SummaryPanel = (props) => {
  const { serviceSummary, serviceHandler, next } = props;
  let total = 0;
  let emptyCart = true;
  const selected = [];
  serviceSummary.map((service, index) => {
    if (service.quantity > 0) {
      const mutatedService = service;
      mutatedService.index = index;
      selected.push(mutatedService);
      total += Number(service.price) * service.quantity;
      emptyCart = false;
    }
  });

  return (
    <div style={summary}>
      <h3>
        Services selected:
      </h3>
      {selected.map((service, index) => (
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
      Total: ${total}
      {emptyCart
        ? (
          <p>Select something from the menu!</p>
        )
        : (
          <div style={nextButton} onClick={next}> Next</div>
        )
      }
    </div>
  );
};

export default SummaryPanel;
