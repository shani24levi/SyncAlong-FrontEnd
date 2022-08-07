import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMeetingSync } from '../../Store/actions/syncperformanceActions'
import { Grid, Box, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import PurpleChartCard from '../charts/PurpleChartCard';
import isEmpty from '../../validation/isEmpty';
import { dateFormat } from '../../Utils/dateFormat';
import DonutAvg from '../charts/DonutAvg';
import SyncsLineChart from './SyncsLineChart';
import Column from '../charts/Column';
import ColoredLines from '../charts/ColoredLines';

const bgcolor = [
    'rgb(159, 159, 248)',
    'rgb(248, 159, 204)',
    'rgb(248, 248, 159)',
    'rgb(159, 248, 204)',
    'rgb(159, 248, 248)',
    'rgb(248, 195, 159)',
    'rgb(159, 230, 248)',
    'rgb(159, 159, 248)',
    'rgb( 248, 159, 204)',
    'rgb(248, 248, 159)',
    'rgb(159, 248, 204)',
    'rgb(159, 248, 248)',
    'rgb(248, 195, 159)',
    'rgb(159, 230, 248)',
]

const linecolor = [
    '#5050de',
    '#912d60',
    '#bdbd2d',
    '#2a7550',
    '#277575',
    '#c96622',
    '#388194',
    '#5050de',
    '#912d60',
    '#bdbd2d',
    '#2a7550',
    '#277575',
    '#c96622',
    '#388194'
]

function SyncView({ selectedVideo, syncs }) {
    const dispatch = useDispatch();
    const syncperformance = useSelector(state => state.syncperformance.syncs);
    const user = useSelector(state => state.auth.user);
    let [syncbyAct, setSyncByAct] = useState([]);
    let [syncObjs, setSyncObjs] = useState([]);
    let [syncAvgs, setSyncAvgs] = useState([]);
    let [allSync, setAllSync] = useState([]);
    let [avgSync, setAvgSync] = useState(null);
    let [oneTime, setOneTime] = useState(false);
    const [series1, setSeries1] = useState([]);
    const [series, setSeries] = useState([]);
    const [dataEach3sec, setDataEach3sec] = useState([]);

    useEffect(() => {
        if (!isEmpty(syncs)) {
            syncs.map(el => {
                let sync = el.meeting_id.activities.find(activity => activity === el.activity);
                setSyncByAct((syncbyAct) => [...syncbyAct, { activity: sync, result: el.result, time: el.time }]);
            });
        }
    }, [])

    useEffect(() => {
        if (!isEmpty(syncbyAct) && isEmpty(allSync)) {
            let size = true;
            let activity1 = syncbyAct;
            let a = activity1[0].activity;
            let len = syncbyAct.length;

            while (size) {
                let filterd = activity1.filter(el => el.activity === a);
                let obj = { activity: filterd[0].activity, result: [], time: [] }
                let sum = 0;
                let count = 0;
                filterd.map(el => {
                    obj.result.push(Number(el.result));
                    obj.time.push(el.time);
                    sum = sum + Number(el.result);;
                    count++;
                })
                let objAvg = { activity: filterd[0].activity, avg: sum / count }
                setSyncAvgs((syncAvgs) => [...syncAvgs, objAvg]);
                setSyncObjs((syncObjs) => [...syncObjs, obj]);

                size = len - filterd.length > 0;
                if (size) {
                    activity1 = activity1.slice(filterd.length + 1, len) //activity1[filterd.length + 1].activity;
                    a = activity1[0].activity;
                    len = activity1.length;
                }
            }
        }
    }, [syncbyAct])

    useEffect(() => {
        if (!isEmpty(syncObjs) && isEmpty(allSync)) {
            console.log('syncObjs', syncObjs);
            if (syncObjs.length === 1) {
                setAllSync(syncObjs[0].result)
            }
            else if (syncObjs.length > 1) {
                let arr = [];
                syncObjs.map(el => {
                    el.result.map(r =>
                        arr.push(r)//Math.trunc(r * 100))
                    )
                })
                setAllSync(arr);
            }

            if (!isEmpty(syncObjs)) {
                let sum = 0;
                let count = 1;

                syncObjs.map((el, index) => {
                    let arr = [];
                    let j = 1;
                    el.result.map((result, i) => {
                        if (sum === 0) sum = result;
                        if (i !== 0 && el.time[i] === el.time[i - 1]) {
                            sum = sum + result;
                            count = count + 1;
                        }
                        else {
                            let avg = sum / count;
                            arr.push({ x: j, y: Math.trunc(avg * 10) });
                            sum = 0;
                            count = 1;
                            j++;
                        }
                    });
                    setSeries1(series1 => [...series1, { name: el.activity, data: arr }])
                });
            }
        }
    }, [syncObjs])

    useEffect(() => {
        if (!isEmpty(allSync)) {
            let sum = 0;
            allSync.map(i => {
                sum = sum + i
            })
            let avg = sum / allSync.length;
            setAvgSync(Math.trunc(avg * 100));
        }
    }, [allSync])

    useEffect(() => {
        if (!isEmpty(series1)) {
            setSeries(series1);
        }
    }, [series1])

    useEffect(() => {
        if (!isEmpty(series) && !isEmpty(syncAvgs)) {
            let series_arr = [];
            let series_arr_2 = [];
            let series_arr_3 = [];

            series.map(i => {
                i.data.map(j => {
                    series_arr.push(j.y);
                })
                series_arr_2.push(series_arr);
                series_arr = [];
            })
            let count = 0;
            let sum5sec = 0;
            series_arr_2.map(i => {
                i.map(j => {
                    if (count !== 2) {
                        sum5sec += j;
                        count++;
                    }
                    else {
                        let total5 = sum5sec / count;
                        series_arr.push(total5);
                        count = 0;
                        sum5sec = 0;
                    }
                })
                series_arr_3.push(series_arr);
                series_arr = [];
            })
            setDataEach3sec(series_arr_3);
        }
    }, [series, syncAvgs])

    useEffect(() => {
        if (!isEmpty(dataEach3sec) && !isEmpty(syncAvgs) && user.role === 'trainer' && !oneTime) {
            let arrResults = syncAvgs;
            arrResults.map((el, i) => {
                el.series = dataEach3sec[i];
            })

            if (!isEmpty(syncperformance) && syncperformance.length !== 0) {
                console.log('syncperformance', syncperformance);
                let meeting_fuond = null;
                syncperformance.map(el => {
                    if (el.meeting_id === selectedVideo._id) {
                        meeting_fuond = el;
                        return;
                    }
                }); // el.meeting_id === selectedVideo._id);
                console.log('meeting_fuond', meeting_fuond);
                if (isEmpty(meeting_fuond)) {
                    dispatch(createMeetingSync({ meeting_id: selectedVideo._id, totalAvg: avgSync, resultByActivities: arrResults }))
                    setOneTime(true);
                    return;
                }
                else return; // camtinue -dont do anything
            }
            else {
                dispatch(createMeetingSync({ meeting_id: selectedVideo._id, totalAvg: avgSync, resultByActivities: arrResults }))
                setOneTime(true);
            }
        }
    }, [dataEach3sec, syncperformance, oneTime])

    return (
        <>
            <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ marginBottom: '2%' }}>
                <Grid item xs={12} md={12} lg={8}>
                    <PurpleChartCard time={selectedVideo.dateEnd ? dateFormat(selectedVideo.dateEnd) : ''} totalSync={avgSync} syncs={allSync} />
                </Grid>
                <Grid
                    component={Box}
                    item
                    xs={4}
                    display={{ xs: "none", md: "none", lg: "block" }}
                >{!isEmpty(syncAvgs) && <DonutAvg syncAvgs={syncAvgs} />}
                </Grid>
            </Grid>

            <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={12} md={12} lg={6}><SyncsLineChart syncs={syncObjs} syncAvgs={syncAvgs} /> </Grid>
                {!isEmpty(series) && !isEmpty(syncAvgs) && <Grid item xs={12} md={12} lg={6}> <Column series={series} syncAvgs={syncAvgs} /> </Grid>}
            </Grid>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={3} mb={1}>
                <Typography variant="h5"
                    sx={{ fontWeight: 700, flexGrow: 1, color: '#f5f5f5' }} gutterBottom>
                    Syncs By Activitis
                </Typography>
            </Stack>

            <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center">
                {
                    !isEmpty(series) && !isEmpty(dataEach3sec) && dataEach3sec.map((el, i) => {
                        return (
                            <Grid item xs={6} md={4} lg={4} key={i}> <ColoredLines bgcolored={bgcolor[i]} lineColore={linecolor[i]} series={el} syncAvgs={syncAvgs[i]} /> </Grid>
                        )
                    })

                }
            </Grid>
        </>
    );
}

export default SyncView;