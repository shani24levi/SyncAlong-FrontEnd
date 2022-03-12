import React, { useState, useEffect, useRef } from 'react';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'


const locales = {
    "en-AU": require("date-fns/locale/en-AU"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function CalendarMeetings({ events, handleSelectSlot, handleSelectEvent, handelClose }) {
    console.log('====================================');
    console.log(events);
    console.log('====================================');
    return (
        <Calendar
            selectable={true}
            localizer={localizer}
            events={events}
            startAccessor="start" endAccessor="end"
            style={{ height: 500, margin: "50px" }}
            step={30}
            defaultView="month"
            views={["month", "week", "day"]}
            defaultDate={new Date()}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
        />
    );
}

export default CalendarMeetings;