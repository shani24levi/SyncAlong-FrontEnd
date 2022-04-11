import React from 'react';
import { styled, Grid, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

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
    const [value, setValue] = React.useState(new Date());
    const [houre, sethoure] = React.useState(false);

    if (!date) return <div />;

    return (
        <Grid
            style={{
                display: 'flex',
                flexDirection: 'column',
                color: '#ddd',
                overflowY: 'scroll',
            }}>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>
                {getDate(date)}
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticTimePicker
                    displayStaticWrapperAs="mobile"
                    value={value}
                    onChange={(newValue) => {
                        setHour(newValue);
                        setValue(newValue);
                        // if (houre) {
                        //     console.log(newValue);
                        //     setHour(newValue);
                        //     setValue(newValue);
                        // }
                        // sethoure(true)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Grid>
    );
}

export default TimeSelector;