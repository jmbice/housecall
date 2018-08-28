import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import key from '../../server/keys/google.js';
import $ from 'jquery';

const localizer = BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const TimePicker = (props) => {
  const {
    startDate, appointments, hours, currentView, setView,
    address, city, state, zip, rbcAppointments,
  } = props;

  // hardCoded schedule
  const minTime = new Date();
  minTime.setHours(9, 0, 0);

  // hardCoded schedule
  const maxTime = new Date();
  maxTime.setHours(21, 0, 0);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    console.log('the title is:', title, start, end);
  };

  const googleTravelTimes = (departureTime) => {
    const origins = [];
    const destinations = [];
    rbcAppointments.forEach((apt) => {
      const bookedLocations = `${apt.address.split(' ').join('+')}+${apt.city.split(' ').join('+')}+${apt.state.split(' ').join('+')}+${apt.zip.split(' ').join('+')}`;
      const potentialLocation = `${address.split(' ').join('+')}+${city.split(' ').join('+')}+${state.split(' ').join('+')}+${zip.split(' ').join('+')}`;
      origins.push(potentialLocation);
      destinations.push(bookedLocations);
      origins.push(bookedLocations);
      destinations.push(potentialLocation);
    });

    const orgString = origins.join('|');
    const destString = destinations.join('|');
    const locationsString = `?origins=${orgString}&destinations=${destString}`;
    const paramatersString = `&mode=driving&language=en-EN&key=${key.API_KEY}`;
    let completeString = '';

    if (departureTime) {
      const trafficParamsString = `&mode=driving&departure_time=${departureTime}&traffic_model=best_guess&language=en-EN&key=${key.API_KEY}`;
      completeString = `https://maps.googleapis.com/maps/api/distancematrix/json${locationsString}${trafficParamsString}`;
    } else {
      completeString = `https://maps.googleapis.com/maps/api/distancematrix/json${locationsString}${paramatersString}`;
    }

    //console.log(completeString);
    // $.ajax({
    //   url: 'http://localhost:3000/api/provider/travelTimes',
    //   method: 'POST',
    //   data: { googleQuery: completeString },
    //   dataType: 'json',
    //   success: (data) => {
    //     console.log('Response:', data);
    //   },
    // });
  };
  //googleTravelTimes();

  const adjustAppointments = () => {
    const newAppointments = [];
    appointments.forEach((apt, index) => {
      const newEvent = {};
      const before = index * 2;
      const after = before + 1;
      const durationBefore = Math.ceil(googleData.rows[before].elements[before].duration.value / 60);
      const durationAfter = Math.ceil(googleData.rows[after].elements[after].duration.value / 60);
      newEvent.duration = (Number(apt.duration) + durationBefore + durationAfter).toString();
      newEvent.start_time = moment(apt.start_time, 'HH:mm');
      newEvent.start_time.subtract(durationBefore, 'minutes');
      newEvent.start_time = newEvent.start_time.format('HH:mm');
      newAppointments.push(newEvent);
    });
    return newAppointments;
  };

  return (
    <div>
      {JSON.stringify(rbcAppointments)}
      <div>
        <BigCalendar
          selectable
          localizer={localizer}
          events={rbcAppointments}
          view={currentView}
          views={['week', 'day']}
          onView={(view) => {
            setView('currentView', view);
          }}
          onNavigate={(date) => {
            setView('startDate', moment(date).format('YYYY-MM-DD'));
          }}
          min={minTime}
          max={maxTime}
          timeSlots={15}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={handleSelect}
        />
      </div>
      <h1>{startDate}</h1>

    </div>
  );
};

export default TimePicker;
