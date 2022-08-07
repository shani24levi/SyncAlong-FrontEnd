import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import ElderlyWomanIcon from '@mui/icons-material/ElderlyWoman';
import { Button, Grid } from '@material-ui/core';
import VisibilityIcon from '@mui/icons-material/Visibility';
import isEmpty from '../../validation/isEmpty';
import { dateFormat } from '../../Utils/dateFormat';

function ListBoxTop({ meetings_complited }) {
    const profile = useSelector(state => state.profile);
    const [traineeId, setTraineeId] = useState(null);
    const [filterdList, setFilterdList] = useState([]);
    const navigate = useNavigate();

    const CardHeader = styled('div')(() => ({
        paddingLeft: '24px',
        paddingRight: '24px',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }))

    const Title = styled('span')(() => ({
        fontSize: '1rem',
        fontWeight: '500',
        textTransform: 'capitalize',
    }))

    const SyncTable = styled(Table)(() => ({
        minWidth: 400,
        whiteSpace: 'pre',
        '& Typography': {
            height: 15,
            width: 50,
            borderRadius: 500,
            boxShadow:
                '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        },
        '& td': {
            borderBottom: 'none',
        },
        '& td:first-of-type': {
            paddingLeft: '16px !important',
        },
    }))

    const Small = styled('small')(({ bgcolor }) => ({
        height: 15,
        width: 50,
        color: '#fff',
        padding: '2px 8px',
        borderRadius: '4px',
        overflow: 'hidden',
        background: bgcolor,
        boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    }))

    useEffect(() => {
        //all users 
        if (isEmpty(traineeId)) {
            let sliced5 = meetings_complited.slice(0, 5);
            setFilterdList([]);
            sliced5.map(el => {
                setFilterdList(filterdList => [...filterdList, el])
            })
        }
        else {
            let users = meetings_complited.filter(el => el.trainee._id === traineeId);
            let sliced5 = users.slice(0, 5);
            setFilterdList([]);
            sliced5.map(el => {
                setFilterdList(filterdList => [...filterdList, el])
            })
        }
    }, [traineeId])

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>Complited Meetings</Title>
                <Grid container alignItems='flex-end' justifyContent='flex-end'>
                    <Select size="small" defaultValue="this_month">
                        <MenuItem value="this_month">All Users</MenuItem>
                        {
                            profile.trainees_profiles && profile.trainees_profiles?.map((trainee, i) => {
                                return <MenuItem value={trainee.user._id} key={i} onClick={() => setTraineeId(trainee.user._id)}>
                                    {trainee.user.username}</MenuItem>
                            })
                        }
                    </Select>
                </Grid>
            </CardHeader>
            <Box overflow="auto">
                <SyncTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                User
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Time
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Amount Of Activities
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={1}>
                                View
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterdList.map((el, index) => (
                            <TableRow key={index} hover>
                                <TableCell
                                    colSpan={4}
                                    align="left"
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={el.trainee.avatar} />
                                        <Typography sx={{ m: 0, ml: 4 }}>
                                            {el.trainee.user}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    {" "}
                                    {!isEmpty(el.dateEnd)
                                        ? <>{dateFormat(el.dateEnd)}</>
                                        : ""}
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0 }}
                                    align="left"
                                    colSpan={2}
                                >
                                    {el.activities ? (
                                        el.activities.length <= 2 ? (
                                            <Small bgcolor={'red'}>
                                                {el.activities.length} actvitis
                                            </Small>
                                        ) : (
                                            <Small bgcolor={'blue'}>
                                                {el.activities.length} actvitis
                                            </Small>
                                        )
                                    ) : (
                                        <Small bgcolor={'bgError'}>
                                            ?
                                        </Small>
                                    )}
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={1}>
                                    <Button endIcon={<VisibilityIcon />} onClick={() => navigate(`/meeting/watch/${el._id}`)} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {filterdList.length === 0 &&
                            <Box m="auto"
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center"
                                minHeight="50px"
                                marginTop="50px"
                                marginBottom="50px"
                            >
                                <ElderlyWomanIcon style={{ height: '50px', width: '50px' }} />
                                <Typography variant='h6'>{"No Meetings Found"}</Typography>
                            </Box>
                        }
                    </TableBody>
                </SyncTable>
            </Box>
        </Card>
    );
}

export default ListBoxTop;