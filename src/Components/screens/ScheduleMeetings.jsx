import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMeetings } from '../../Store/actions/meetingActions';

import isEmpty from '../../validation/isEmpty';
import CalendarMeetings from '../meeting/scheduleMeetings/CalendarMeetings';
import MeetingModal from '../meeting/scheduleMeetings/MeetingModal';
import ScheduleHeader from '../meeting/scheduleMeetings/ScheduleHeader';
import ScrollTop from '../scrollToTop/ScrollTop';


const ScheduleMeetings = (props) => {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState({
        title: "",
        start: new Date()
    });
    const [modalCreate, setModalCreate] = useState(false);
    const [meetingEvents, setMeetingEvents] = useState([]);
    const [firstTime, setFirstTime] = useState(true);

    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.profile);
    const meetings = useSelector(state => state.meetings);

    useEffect(() => {
        if (!meetings.all_meetings || isEmpty(meetings.all_meetings)) {
            dispatch(getAllMeetings());
        }
    }, [])

    useEffect(() => {
        console.log('meetings.all_meetings', meetings.all_meetings);
        if (!meetings.all_meetings || isEmpty(meetings.all_meetings)) return;

        if (meetings.all_meetings?.length != 0 && meetings.all_meetings?.length !== meetingEvents?.length) {
            const newState = meetings.all_meetings.map(obj =>
                obj.date ? { ...obj, date: new Date(obj.date), start: new Date(obj.date), end: new Date(obj.date) } : obj
            );
            setMeetingEvents(newState);
        }
        else if (meetings.all_meetings?.length > 0) {
            const newState = meetings.all_meetings.map(obj =>
                obj.date ? { ...obj, date: new Date(obj.date), start: new Date(obj.date), end: new Date(obj.date) } : obj
            );
            setMeetingEvents(newState);
        }
    }, [meetings])

    useEffect(() => {
        if (firstTime)
            return
        setModalIsOpen(true);
    }, [modalData, firstTime])

    const handleSelectSlot = (start) => {
        //handel create new meeting 
        console.log('start', start);
        setModalCreate(true);
        setFirstTime(false)
        setModalData(start);
    };

    const handleSelectEvent = (start) => {
        if (user.role === 'trainee') return;
        //  console.log('handleSelectEvent', start);
        setModalCreate(false);
        setFirstTime(false)
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

    // let events = [
    //     {
    //         title: "Test Meeting",
    //         allDay: true,
    //         start: new Date(2022, 2, 1),
    //         end: new Date(2022, 2, 1),
    //     },
    // ];

    console.log('firstTime', firstTime);
    console.log('modalData', modalData);
    console.log(meetingEvents);
    return (
        <>
            <div id="back-to-top-anchor" />
            <MeetingModal modalIsOpen={modalIsOpen} modalCreate={modalCreate} modalData={modalData} handelClose={handelClose} />
            <Container>
                <ScheduleHeader month={month} newMeeting={newMeeting} />
                <CalendarMeetings events={meetingEvents} handleSelectSlot={handleSelectSlot} handleSelectEvent={handleSelectEvent} />
            </Container>
            <ScrollTop />
        </>
    );
}

export default ScheduleMeetings;