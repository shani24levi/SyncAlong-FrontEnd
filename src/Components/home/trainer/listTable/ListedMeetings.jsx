import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filter } from 'lodash';
// material
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserListToolbar from './UserListToolbar';
import UserListHead from './UserListHead';
import UserMoreMenu from './UserMoreMenu';
import buttonsStyles from "../../../../assets/theme/buttons";
import { dateFormat } from '../../../../Utils/dateFormat';
import { capitalize } from '../../../../helpers';
import isEmpty from '../../../../validation/isEmpty';
const buttonStyle = makeStyles(buttonsStyles);


const TABLE_HEAD = [
    { id: 'name', label: 'With User', alignRight: false },
    { id: 'time', label: 'Scheduled Time', alignRight: false },
    { id: 'title', label: 'Meeting Name', alignRight: false },
    { id: 'status', label: 'Active', alignRight: false },
];

function ListedMeetings({ traineeId, complited = null, username }) {
    const [arrMeetings, setArrMeetings] = useState([]);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const meetings = useSelector(state => state.meetings.meetings);
    const meetingsComplited = useSelector(state => state.meetings.meetings_complited);
    const btnClasses = buttonStyle();

    useEffect(() => {
        if (traineeId && complited === 'complited') { //for page of trainee views
            if (!meetingsComplited) {
                let arr = [];
                meetingsComplited?.map(i => {
                    if (i.trainee._id === traineeId)
                        arr.push({ _id: i._id, name: i.trainee.user, avatarUrl: i.trainee.avatar, time: i.date.toString(), status: i.status, title: i.title })
                })
                setArrMeetings(arr);
            }
            else return <>No Meeting Complited</>
        }

        if (meetings?.length != 0) {
            let arr = [];
            console.log(traineeId, '!isEmpty(traineeId)', !isEmpty(traineeId));
            if (!isEmpty(traineeId)) { //for page of trainee views
                console.log('dddkdk', traineeId);
                meetings?.map(i => {
                    if (i.trainee._id === traineeId)
                        arr.push({ _id: i._id, name: i.trainee.user, avatarUrl: i.trainee.avatar, time: i.date.toString(), status: i.status, title: i.title })
                })
            }
            else { //all
                meetings?.map(i => {
                    arr.push({ _id: i._id, name: i.trainee.user, avatarUrl: i.trainee.avatar, time: i.date.toString(), status: i.status, title: i.title })
                })
            }
            setArrMeetings(arr);
        }
    }, [traineeId])

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function applySortFilter(array, comparator, query) {
        // console.log(array, comparator, query);
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        if (query) {
            return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        }
        return stabilizedThis.map((el) => el[0]);
    }

    const handleClick = (event, name) => {
        console.log('handleClick', name);
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - meetings?.length) : 0;
    const filteredUsers = applySortFilter(arrMeetings, getComparator(order, orderBy), filterName);
    const isUserNotFound = filteredUsers.length === 0;

    const handleFilterByName = (event) => {
        console.log('handleFilterByName', event.target.value);
        setFilterName(event.target.value);
    };

    const handleRequestSort = (event, property) => {
        console.log('handleRequestSort');
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            console.log('event.target.checked', event.target.checked);
            const newSelecteds = arrMeetings.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            {
                !traineeId || !isEmpty(username) &&
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={3} mb={1}>
                    <Typography variant="h4"
                        sx={{ fontWeight: 700, flexGrow: 1, color: '#f5f5f5' }} gutterBottom>
                        {isEmpty(username) ? `Meetings` : `Meetings of ${username}`}
                    </Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/schedule/meetings"
                        className={btnClasses.purpleRound}
                        startIcon={<AddIcon />}
                    >
                        New Meeting
                    </Button>
                </Stack>
            }

            <Card>
                <UserListToolbar
                    numSelected={selected.length}
                    selected={selected}
                    setSelected={setSelected}
                    arrMeetings={arrMeetings}
                    setArrMeetings={setArrMeetings}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <UserListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={meetings?.length}
                            numSelected={selected.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                        />

                        <TableBody>
                            {filteredUsers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    const { _id, name, time, title, status, avatarUrl } = row;
                                    const isItemSelected = selected.indexOf(_id) !== -1;

                                    return (
                                        <TableRow
                                            hover
                                            key={_id}
                                            tabIndex={-1}
                                            role="checkbox"
                                            selected={isItemSelected}
                                            aria-checked={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onChange={(event) => handleClick(event, _id)}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar alt={name} src={avatarUrl} />
                                                    <Typography variant="subtitle2" noWrap>
                                                        {capitalize(name)}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="left">{dateFormat(time)}</TableCell>
                                            <TableCell align="left">{capitalize(title)}</TableCell>
                                            <TableCell align="left">{status ? 'Yes' : 'No'}</TableCell>

                                            <TableCell align="right">
                                                <UserMoreMenu />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={arrMeetings.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </>
    );
}

export default ListedMeetings;