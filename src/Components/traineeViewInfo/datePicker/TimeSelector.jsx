import React from 'react';
import { styled, Grid, Button } from '@mui/material';

const getDate = (_date) => {
    const date = _date ? _date : new Date();
    const text = _date ? 'Selected Date' : 'Todays Date';

    return text + ': ' + date.toLocaleDateString('en-gb');
};

const StyledButton = styled(Button)`
    color: white;
    margin: 8px;
    /* border: 1px solid rgb(122 99 240 / 50%); */
  
    :hover {
      /* border: 1px solid rgb(122 99 240 / 50%); */
      /* background: rgb(122 99 240 / 50%); */
    }
  `;

const addZero = (time) => {
    if (time > 9) return '';
    return '0';
};

function TimeSelector({
    date,
    setHour,
    timeslot }) {
    if (timeslot.length === 0) return <div />;

    return (
        <Grid
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#303030',
                padding: '1rem 2rem',
                height: '360px',
                color: '#f5f5f5',
                overflowY: 'scroll',
            }}>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>
                {getDate(date)}
            </div>
            {timeslot.map((time, index) => (
                <StyledButton
                    variant="outlined"
                    key={index}
                    onClick={() => setHour(time)}>
                    {`${addZero(time)}${time}:00 `}
                </StyledButton>
            ))}
        </Grid>
    );
}

export default TimeSelector;