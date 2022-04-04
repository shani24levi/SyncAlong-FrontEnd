import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { CalendarPickerSkeleton, PickersDay } from '@mui/lab';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')`
  color: #7e74e7;
  div[role='presentation'] {
    pointer-events: none;
  }
  button[aria-label='calendar view is open, switch to year view'] {
    display: none;
  }
  .Mui-selected {
    background-color: #311165 !important;
    font-weight: 800 !important;
    color: #7e74e7  !important;
  }
`;

const dayOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];

const checkValidDate = (todaysDate, date) => {
    if (todaysDate.getMonth() < date.getMonth()) return true;
    if (todaysDate.getDate() > date.getDate()) return false;
    return true;
};

function Calendar({ date, setDate, setTimeslot }) {
    const todaysDate = new Date();
    const minDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1);
    const maxDate = new Date(
        todaysDate.getFullYear(),
        todaysDate.getMonth() + 2,
        0,
    );

    const StyledPickersDay = styled(PickersDay)`
      background: transparent;
      font-weight: 800;
      font-size: 16px;
      color:  ${(props) => (props.validday === 'true' ? '#cdc8ff' : 'white')};
      opacity: ${(props) => (props.validday === 'true' ? 1 : 0.3)};
      background: ${(props) => (props.validday === 'true' ? '' : 'transparent')};
      border: ${(props) =>
            props.validday === 'true' ? '2px solid #7e74e7b0' : ''};
    `;

    return (
        <div style={{ backgroundColor: '#FFFF' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Wrapper>
                    <CalendarPicker
                        date={date}
                        minDate={minDate}
                        maxDate={maxDate}
                        onChange={(e) => {
                            const dayName = dayOfWeek[e.getDay()];
                            //const { start_hour, end_hour } = time_slot[dayName];
                            setDate(e);
                            //  setTimeslot((2, 3, 1));
                        }}
                        renderLoading={() => <CalendarPickerSkeleton />}
                        renderDay={(day, _value, DayComponentProps) => {
                            const dayName = dayOfWeek[day.getDay()];

                            //   const { available } = time_slot[dayName];
                            const isSelected =
                                !DayComponentProps.outsideCurrentMonth &&
                                // available &&
                                checkValidDate(todaysDate, day);

                            DayComponentProps = {
                                ...DayComponentProps,
                                disabled: !isSelected,
                            };
                            // @ts-ignore
                            return (
                                <StyledPickersDay
                                    {...DayComponentProps}
                                    validday={isSelected.toString()}
                                />
                            );
                        }}
                    />
                </Wrapper>
            </LocalizationProvider>
        </div>
    );
}

export default Calendar;