import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMeetings } from '../../Store/actions/meetingActions';

import isEmpty from '../../validation/isEmpty';
import CalendarMeetings from '../meeting/scheduleMeetings/CalendarMeetings';
import MeetingModal from '../meeting/scheduleMeetings/MeetingModal';
import ScheduleHeader from '../meeting/scheduleMeetings/ScheduleHeader';


const ScheduleMeetings = (props) => {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState({
        title: "",
        start: new Date()
    });
    const [modalCreate, setModalCreate] = useState(false);
    const [meetingEvents, setMeetingEvents] = useState(null);

    const profile = useSelector(state => state.profile);
    const meetings = useSelector(state => state.meetings);

    useEffect(() => {
        if (!meetings.all_meetings || isEmpty(meetings.all_meetings)) {
            dispatch(getAllMeetings());
        }
    }, [])

    useEffect(() => {
        console.log('meetings.all_meetings', meetings.all_meetings);
        if (meetingEvents && meetings.all_meetings.length !== meetingEvents.length) {
            const newState = meetings.all_meetings.map(obj =>
                obj.date ? { ...obj, date: new Date(obj.date), start: new Date(obj.date), end: new Date(obj.date) } : obj
            );
            setMeetingEvents(newState);
        }

        if (isEmpty(meetings.all_meetings)) {
            console.log('ther is no meetings selcteted');
        }
        else if (meetings.all_meetings.length > 0) {
            const newState = meetings.all_meetings.map(obj =>
                obj.date ? { ...obj, date: new Date(obj.date), start: new Date(obj.date), end: new Date(obj.date) } : obj
            );
            setMeetingEvents(newState);
        }

    }, [meetings])

    const handleSelectSlot = (start) => {
        //handel create new meeting 
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

    console.log(meetingEvents);
    return (
        <>
            <MeetingModal modalIsOpen={modalIsOpen} modalCreate={modalCreate} modalData={modalData} handelClose={handelClose} />
            <Container>
                <ScheduleHeader month={month} newMeeting={newMeeting} />
                <CalendarMeetings events={meetingEvents} handleSelectSlot={handleSelectSlot} handleSelectEvent={handleSelectEvent} />
            </Container>
        </>
    );
}

export default ScheduleMeetings;