import React from 'react';
import { Paper, styled, Grid, Button } from '@mui/material';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventNoteIcon from '@mui/icons-material/EventNote';

const Wrapper = styled(Paper)`
  height: 300px;
  width: 200px;
  position: relative;
  border-radius: 16px;
  margin: 1rem;
  cursor: pointer;
  box-shadow:
  0 1.6px 1.6px rgba(255,0,255, 0.023),
  0 3.8px 3.8px rgba(255,0,255, 0.034),
  0 6.9px 6.9px rgba(255,0,255, 0.041),
  0 11.4px 11.4px rgba(255,0,255, 0.049),
  0 18.8px 18.8px rgba(255,0,255, 0.056),
  0 32.8px 32.8px rgba(255,0,255, 0.067),
  0 71px 71px rgba(255,0,255, 0.09)
;
  transition: all 0.2s ease-in-out;
  &:hover,
  &:focus {
    transform: scale(1.1) !important;
  }
`;

const StyledImage = styled('img')`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  background-color: #131313;
  border-radius: 16px;
`;

const AbsoluteGrid = styled(Grid)`
    color: #fff;
  padding: 5px;
  background: rgb(0, 0, 0, 0.4);
  border-radius: 16px;
  position: absolute;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  .MuiSvgIcon-root {
    padding-right: 4px;
  }
  .MuiGrid-item {
    padding: 4px;
    display: flex;
    align-content: center;
  }
    .UserCard_text {
    font-size: 24px;
    font-weight: 700;
    padding: 8px px;
  }
  .UserCard_topics {
    text-overflow: ellipsis;
  }
`;

function UserCard({ trainee }) {
    const navigate = useNavigate();

    return (
        // <Button onClick={() => navigate(`/trainee/${trainee.user._id}`, { state: { trainee: trainee } })} >
        <Link to={{ pathname: `/trainee/${trainee.user._id}`, state: { trainee: trainee } }}>
            <Wrapper elevation={4}>
                <StyledImage src={trainee.user.avatar} />
                <AbsoluteGrid container>
                    <Grid item>
                        <AccessTimeIcon />
                        {/* Last:{" "} */}
                        <span>{trainee.profile?.meetings.length !== 0 ? trainee.profile?.meetings[0]?.date.toString() : 'No futer meeting '}</span>
                        {/* <span className="UserCard_topics">{trainee.profile?.ended_meetings.length !== 0 ? trainee.profile?.ended_meetings[0]?.date.toString() : ' - '}</span> */}
                    </Grid>
                    <Grid item>
                        <EventNoteIcon />
                        Upcoming Meeting:
                        {/* <span>{trainee.profile?.meetings.length !== 0 ? trainee.profile?.meetings[0]?.date.toString() : ' - '}</span> */}
                    </Grid>
                    <Grid item>{trainee.profile?.relation ? trainee.profile.relation : ''}</Grid>
                    <Grid item className="UserCard_text">
                        {trainee.user.user}
                    </Grid>
                </AbsoluteGrid>
            </Wrapper>
        </Link>
    );
}

export default UserCard;