import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {
  styled, Grid, Avatar, IconButton, Typography, Select,
  InputLabel, MenuItem, FormControl,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { capitalize } from '../../helpers';
import MainConextTrainee from './MainConextTrainee';
import ScrollTop from '../scrollToTop/ScrollTop';
import MeetingCard from './MeetingCard';
import DaterPicker from './datePicker/DaterPicker';
import { dateFormat } from '../../Utils/dateFormat';

const Wrapper = styled('div')`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: '100%';
  color: #f5f5f5;
`;

const TextWrapper = styled('div')`
  width: 100%;
  letter-spacing: 5px;
  .show-more {
    font-weight: 400;
    color: #d4d4d4;
    font-size: 16px;
  }
  .show-more-anchor {
    color: grey;
  }
  .show-more-anchor:hover {
    color: palevioletred;
  }
  .MuiTypography-h5{
    letter-spacing: 5px !importent;
  }
`;

const Banner = styled('div')`
  background-color: #7f5a83;
  background-image: linear-gradient(120deg, #7f5a83 0%, #0d324d 74%);
  /* background-image: linear-gradient(90deg, #3512b2, #d18873); */

  width: 100%;
  height: 180px;
`;
const Container = styled(Grid)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PhotoWrapper = styled('div')`
  padding: 16px;
  display: flex;
  flex-direction: row;

  div {
    padding: 2px 8px;
  }
`;

const Photo = styled('div')`
  width: 50px;
  .MuiAvatar-root {
    height: 100px;
    width: 100px;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translate(0, -50%);
  }
`;

function TraineeView({ trainee }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const [page, setPage] = useState(1);
  const [type, setType] = useState(10);
  const [open, setOpen] = React.useState(false);
  const [lastMeeting, setlastMeetingState] = useState(null);

  //console.log('id', id, location.state.trainee);

  const setlastMeeting = (lastMeeting) => {
    console.log('kckckc', lastMeeting);
    setlastMeetingState(lastMeeting);
  }

  return (
    <>
      <div id="back-to-top-anchor" />
      <Wrapper>
        <Banner />
        <Grid
          container
          height="100%"
          justifyContent="flex-start"
          sx={{ padding: '0rem 4rem' }}>
          <Container>
            <PhotoWrapper>
              <Photo>
                <Avatar
                  src={trainee.user.avatar}
                  sx={{
                    bgcolor: "#8c3db9",
                    padding: '0px !important',
                    border: '5px solid #8c3db9',
                  }}>
                </Avatar>
              </Photo>
              <span style={{ flexGrow: 1 }}></span>

              <IconButton
                onClick={() => setOpen(true)}
                aria-label="add to wish list"
                size="large"
                color="inherit"
              >
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>

              <IconButton
                onClick={() => navigate(`/profile/trainee/${trainee.user._id}`, { state: { trainee: trainee } })}
                aria-label="go to trainee profile"
                size="large"
                color="inherit"
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </PhotoWrapper>

            <TextWrapper>
              <Typography variant="h5" fontWeight={700}>
                Hello To {capitalize(trainee.user.user)}
              </Typography>
              <Typography fontWeight={600} sx={{ py: 1 }}>
                Ceated by {capitalize(user.user)}'s user at {dateFormat(trainee.user.createdAt)}
              </Typography>
            </TextWrapper>

            <Grid container sx={{ py: 2 }} justifyContent={'space-around'}>
              <Grid
                container
                direction="column"
                item
                xs={12}
                md={5}
                spacing={1}>
                <Grid item fontWeight={700}>
                  Last Meeting
                </Grid>
                <Grid item lg={4} ><MeetingCard setlastMeeting={setlastMeeting} traineeId={trainee.user._id} filterBy='last' /></Grid>
              </Grid>
              <Grid
                container
                direction="column"
                item
                xs={12}
                md={5}
                spacing={1}>
                <Grid item fontWeight={700}>
                  Future meeting
                </Grid>
                <Grid item lg={4}><MeetingCard traineeId={trainee.user._id} filterBy='future' /></Grid>
              </Grid>
            </Grid>
            <Divider light style={{ backgroundColor: '#f5f5f5', marginBottom: '2%' }} />

            <MainConextTrainee trainee={trainee} lastMeeting={lastMeeting} />
          </Container>
        </Grid>
      </Wrapper>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DaterPicker trainee={trainee} setOpen={setOpen} open={open} />
      </Dialog>
      <ScrollTop />
    </>
  );
}

export default TraineeView;