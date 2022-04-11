import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Card, Typography, Grid } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { set } from 'date-fns';
import { dateFormat } from '../../Utils/dateFormat';
import { Button, IconButton } from '@material-ui/core';
import buttonsStyles from "../../assets/theme/buttons";
const buttonStyle = makeStyles(buttonsStyles);

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: '16px',
    borderRadius: '16px',
    color: 'rgb(4, 41, 122) !important',
    backgroundColor: 'rgb(208, 242, 255) !important'
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
        theme.palette.primary.dark,
        0.24
    )} 100%)`
}));

function MeetingCard({ setlastMeeting, traineeId, filterBy }) {
    const navigate = useNavigate();
    const btnClasses = buttonStyle();
    const meetings = useSelector(state => state.meetings);
    const [meetingcard, setMeeting] = useState(null);

    useEffect(() => {
        let meeting;
        if (filterBy === 'future' && traineeId) {
            if (meetings.upcoming_meeting.trainee._id === traineeId)
                meeting = meetings.upcoming_meeting;
            else
                meeting = meetings.all_meetings.find(i => i.trainee._id === traineeId);
        }
        else if ((filterBy === 'last') && traineeId) {
            meeting = meetings.meetings_complited.find(i => i.trainee._id === traineeId && !meeting?.urlRoom);
            setlastMeeting(meeting)
        }
        setMeeting(meeting);
    }, [meetings])

    console.log(filterBy, meetingcard, traineeId);
    return (
        <RootStyle>
            <IconWrapperStyle>
                <EventAvailableIcon icon="ant-design:android-filled" width={24} height={24} />
            </IconWrapperStyle>
            {
                meetingcard ?
                    <>
                        <Typography variant="h6">{`${dateFormat(meetingcard.date)}`}</Typography>
                        {
                            meetingcard?.urlRoom && <Button className={btnClasses.blueRound} onClick={() => navigate(`/meeting/watch/${meetingcard._id}`)}>Meeting Report</Button>
                        }
                        {
                            filterBy === 'future' && <Button className={btnClasses.blueRound} onClick={() => navigate(`/schedule/meetings/${traineeId}`)}>All Meetings</Button>
                        }
                    </>
                    :
                    <Typography variant="h6">No Meeting</Typography>
            }
        </RootStyle>
    );
}

export default MeetingCard;