import React from 'react';
import { styled } from '@mui/material/styles';
import {
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    OutlinedInput,
    InputAdornment
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMeeting } from '../../../../Store/actions/meetingActions';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import { dateFormat } from '../../../../Utils/dateFormat';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { width: 320 },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[200]} !important`
    }
}));

// ----------------------------------------------------------------------

function UserListToolbar({ numSelected, selected, setSelected, arrMeetings, setArrMeetings, filterName, onFilterName }) {
    const dispatch = useDispatch();
    const meetings = useSelector(state => state.meetings.meetings);

    const handelDelete = () => {
        let arr = [];
        if (meetings?.length != 0) {
            meetings?.map(i => {
                for (const j of selected) {
                    //  console.log(j, i._id);
                    if (i._id === j) arr.push(i);
                }
            })
        }
        let name = '';
        if (arr.length > 1) {
            console.log(arr);
            arr.map((i, index) => {
                name = name + ` ${index + 1}: at ${dateFormat(i.date)}`
                console.log('2', name);

            })
        }
        else name = `with ${arr[0].trainee.user} at ${dateFormat(arr[0].date)}`;

        Swal.fire({
            title: 'Are you sure?',
            text: `delete meeting: ${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete Meeting'
        }).then((result) => {
            if (result.isConfirmed) {
                //do api call to delete 
                for (const id of arr) {
                    console.log(' id', id);
                    dispatch(deleteMeeting(id))
                    setArrMeetings(arrMeetings => arrMeetings.filter(i => i._id !== id._id))
                }
                setSelected([]);
                Swal.fire(
                    'Deleted!',
                    'Your Meeting has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <RootStyle
            sx={{
                ...(numSelected > 0 && {
                    color: '#2E8B57',
                    bgcolor: 'rgba(0,255,0,0.2)'
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <SearchStyle
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="Search user..."
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    }
                />
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handelDelete}>
                        <DeleteIcon icon="eva:trash-2-fill" />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon icon="ic:round-filter-list" />
                    </IconButton>
                </Tooltip>
            )}
        </RootStyle>
    );
}

export default UserListToolbar;