import React, { useState } from 'react';
import CalendarMeetings from '../meeting/scheduleMeetings/CalendarMeetings';
import MeetingModal from '../meeting/scheduleMeetings/MeetingModal';
import ScheduleHeader from '../meeting/scheduleMeetings/ScheduleHeader';


const ScheduleMeetings = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState({ 
        title: "",
        start: new Date() 
    });
    const [modalCreate, setModalCreate] = useState(false);

    const handleSelectSlot = (start) => {
        console.log(start);
        setModalCreate(true);
        setModalIsOpen(true);
        setModalData(start);
    };

    const handleSelectEvent = (start) => {
        setModalCreate(false);
        setModalIsOpen(true);
        setModalData(start);
    };

    const month = 'Schedule Sports Meetings'

    const newMeeting = () => {
        setModalCreate(true);
        setModalIsOpen(true);
        setModalData({ start: new Date() });
    }

    const handelClose = () => {
        setModalIsOpen(false);
    }

    const events = [
        {
            title: "Big Meeting",
            allDay: true,
            start: new Date(2022, 2, 1),
            end: new Date(2022, 2, 1),
        },
        {
            title: "Vacation",
            start: new Date(2022, 3, 7),
            end: new Date(2022, 3, 10),
        },
        {
            title: "Conference",
            start: new Date(2022, 3, 20),
            end: new Date(2022, 3, 23),
        },
    ];

    return (
        <>
            <MeetingModal modalIsOpen={modalIsOpen} modalCreate={modalCreate} modalData={modalData} handelClose={handelClose} />
            <ScheduleHeader month={month} newMeeting={newMeeting} />
            <CalendarMeetings events={events} handleSelectSlot={handleSelectSlot} handleSelectEvent={handleSelectEvent} />
        </>
    );
}

export default ScheduleMeetings;