import React, { useEffect, useState } from 'react';
import {
    Typography,
    Divider,
    styled,
    TextareaAutosize,
    Button,
    InputBase,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../../loder/Loder';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import Email from '@mui/icons-material/Email';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { getDay, getMonth } from '../../../Utils/dateFormat';
import { capitalize } from '../../../helpers';

const TextAreaWrapper = styled('div')({
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid white',
    borderRadius: '4px',
    marginTop: '6px',

    '&:focus-within': {
        border: '1px solid #2684ff',
    },

    '.Search_Input': {
        padding: '0px 6px',
        width: '100%',
    },
});

const TextArea = styled(TextareaAutosize)`
    width: 320px;
    outline: none;
    background-color: #303030;
    color: #f5f5f5;
    font-size: 16px;
    border-color: hsl(0, 0%, 80%);
    resize: none;
    border-radius: 4px;
    :focus {
      border: 1px solid #2684ff;
    }
  `;

const StyledButton = styled(Button)`
    background-size: 200%;
    width: 100%;
    font-weight: 700;
    color: #f5f5f5;
    font-size: 1rem;
    background-image: linear-gradient(90deg, #3512b2, #d18873);
    box-shadow: 0 2px 1px transparent, 0 4px 2px transparent,
      0 8px 4px transparent, 0 16px 8px transparent, 0 32px 16px transparent;
    transition: all 0.8s cubic-bezier(0.32, 1.32, 0.42, 0.68);
  `;

function Confirmation(date, hour, setHour, trainee) {
    const dayString = `${getMonth(date.date.getMonth())} ${date.date.getDate()} , ${getDay(date.date.getDay())} `
    const timeString = `${date.hour.getHours()}:00 - ${date.hour.getHours() + 1}:00`;

    console.log('trainee', trainee);
    return (
        <>
            {!trainee ?
                <div>
                    <Typography variant="h5" sx={{ fontWeight: 800, p: '8px 0px' }}>
                        Confirm your Meeting
                    </Typography>
                    <Typography variant="body1" style={{ opacity: 0.8, fontWeight: 700 }}>
                        Meeting session with{' '}
                        <Link to="/" style={{ color: 'grey' }}>
                            {/* {capitalize(trainee.user.user)} */}
                        </Link>
                    </Typography>
                    <div style={{ display: 'flex', fontWeight: 600, padding: '1rem 0rem' }}>
                        <EventAvailableTwoToneIcon color="action" />
                        <span style={{ padding: '0px 1rem' }}>{dayString}</span>
                        <ScheduleRoundedIcon color="action" />
                        <span style={{ padding: '0px 1rem' }}>{timeString}</span>
                    </div>
                    <Divider style={{ margin: '1rem 0rem' }} />
                    <label style={{ fontWeight: 500 }}>Select Activities </label>

                    <label style={{ fontWeight: 500 }}>Add your email id</label>
                    <TextAreaWrapper>
                        <Email sx={{ color: 'darkgrey' }} />
                        <InputBase
                            className="Search_Input"
                            placeholder="Get invite link in your mail"
                            inputProps={{
                                'aria-label': 'Enter Email address to recieve invite link',
                            }}
                        />
                    </TextAreaWrapper>
                    <div style={{ padding: '1rem 0rem' }}>
                        <TextArea
                            aria-label="minimum height"
                            minRows={6}
                            maxRows={10}
                            placeholder="Tips on getting booking accepted &#13;&#10; · Keep your questions specific &#13;&#10;
          · Include portfolio link &#13;&#10;
          · Share your goal for session "
                        />
                    </div>
                    <StyledButton disabled sx={{ cursor: 'pointer' }}>
                        Confirm your Meeting
                    </StyledButton>
                    <div style={{ marginTop: '1rem' }}>
                        <Button
                            onClick={() => setHour(-1)}
                            startIcon={<KeyboardBackspaceIcon />}
                            sx={{
                                margin: 'auto',
                                width: '100%',
                                color: '#f5f5f5',
                                fontWeight: 700,
                            }}>
                            Change Date or Time
                        </Button>
                    </div>
                </div>
                :
                <Loader />
            }
        </>
    );
}

export default Confirmation;