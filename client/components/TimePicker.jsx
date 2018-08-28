import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import key from '../../server/keys/google.js';
import $ from 'jquery';

const localizer = BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const googleData = {
  "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "19.9 km",
                  "value" : 19931
               },
               "duration" : {
                  "text" : "28 mins",
                  "value" : 1679
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "1 m",
                  "value" : 0
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 0
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "12.1 km",
                  "value" : 12073
               },
               "duration" : {
                  "text" : "14 mins",
                  "value" : 854
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "1 m",
                  "value" : 0
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 0
               },
               "status" : "OK"
            }
         ]
      },
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "1 m",
                  "value" : 0
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 0
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "19.6 km",
                  "value" : 19615
               },
               "duration" : {
                  "text" : "23 mins",
                  "value" : 1395
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "16.4 km",
                  "value" : 16390
               },
               "duration" : {
                  "text" : "19 mins",
                  "value" : 1167
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "19.6 km",
                  "value" : 19615
               },
               "duration" : {
                  "text" : "23 mins",
                  "value" : 1395
               },
               "status" : "OK"
            }
         ]
      },
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "19.9 km",
                  "value" : 19931
               },
               "duration" : {
                  "text" : "28 mins",
                  "value" : 1679
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "1 m",
                  "value" : 0
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 0
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "12.1 km",
                  "value" : 12073
               },
               "duration" : {
                  "text" : "14 mins",
                  "value" : 854
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "1 m",
                  "value" : 0
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 0
               },
               "status" : "OK"
            }
         ]
      },
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "17.0 km",
                  "value" : 16957
               },
               "duration" : {
                  "text" : "25 mins",
                  "value" : 1515
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "10.7 km",
                  "value" : 10743
               },
               "duration" : {
                  "text" : "15 mins",
                  "value" : 890
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "1 m",
                  "value" : 0
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 0
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "10.7 km",
                  "value" : 10743
               },
               "duration" : {
                  "text" : "15 mins",
                  "value" : 890
               },
               "status" : "OK"
            }
         ]
      }
   ]
};

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

  // const rbcAppointments = [];

  // const convertStartTime = (stupidDate, stupidTime) => {
  //   const parsedDate = stupidDate.split('T')[0].split('-');
  //   parsedDate[0] = Number(parsedDate[0]);
  //   parsedDate[1] = Number(parsedDate[1]) - 1;
  //   parsedDate[2] = Number(parsedDate[2]);
  //
  //   const parsedTime = stupidTime.split(':');
  //   parsedTime[0] = Number(parsedTime[0]);
  //   parsedTime[1] = Number(parsedTime[1]);
  //   return parsedDate.concat(parsedTime.concat([0, 0]));
  // };
  //
  // const convertEndTime = (stupidDate, time, duration) => {
  //   const newTime = moment(time, 'HH:mm').add(Number(duration), 'm').format('HH:mm').split(':');
  //   newTime[0] = Number(newTime[0]);
  //   newTime[1] = Number(newTime[1]);
  //   const parsedDate = stupidDate.split('T')[0].split('-');
  //   parsedDate[0] = Number(parsedDate[0]);
  //   parsedDate[1] = Number(parsedDate[1]) - 1;
  //   parsedDate[2] = Number(parsedDate[2]);
  //   return parsedDate.concat(newTime.concat([0, 0]));
  // };

  // appointments.forEach((appt) => {
  //   const newEvent = {};
  //   newEvent.id = appt.id;
  //   newEvent.title = `Client ${appt.client_id}`;
  //   newEvent.desc = `Services: ${appt.service_id}`;
  //   newEvent.allDay = false;
  //   newEvent.start = new Date(...convertStartTime(appt.start_date, appt.start_time));
  //   newEvent.end = new Date(...convertEndTime(appt.start_date, appt.start_time, appt.duration));
  //   newEvent.address = appt.address;
  //   newEvent.city = appt.city;
  //   newEvent.state = appt.state;
  //   newEvent.zip = appt.zip;
  //   rbcAppointments.push(newEvent);
  // });

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
