import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Calendar from './Calendar';
import TimeSelector from './TimeSelector';
// import TimeSelector from './TimeSelector';
// import Confirmation from './ConfirmationPage';

function DaterPicker(props) {
    const [timeslot, setTimeslot] = useState([]);
    const [date, setDate] = useState(null);
    const [hour, setHour] = useState(-1);
    return (
        <>
            {hour === -1 && (
                <>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        maxHeight="400px">
                        <Calendar date={date} setDate={setDate} setTimeslot={setTimeslot} />
                        <Divider orientation="vertical" flexItem />
                        <TimeSelector
                            date={date}
                            hour={hour}
                            setHour={setHour}
                            timeslot={timeslot}
                        />
                    </Grid>
                </>
            )}
            {hour !== -1 && (
                <>
                    <Grid
                        alignItems="center"
                        direction="column"
                        style={{
                            padding: '1rem',
                            backgroundColor: 'rgb(48 48 48)',
                            color: '#f5f5f5',
                        }}>
                        {/* <Confirmation date={date} hour={hour} setHour={setHour} /> */}
                    </Grid>
                </>
            )}
        </>
    );
}

export default DaterPicker;