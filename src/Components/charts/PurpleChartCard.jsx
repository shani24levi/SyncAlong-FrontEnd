import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import isEmpty from '../../validation/isEmpty';

function PurpleChartCard({ time, totalSync, syncs }) {
    const theme = useTheme();
    let [syncbyAct, setSyncByAct] = useState([]);
    let [syncObjs, setSyncObjs] = useState([]);
    let [allSync, setAllSync] = useState([]);

    useEffect(() => {
        if (!isEmpty(syncs)) {
            console.log('syncs', syncs, syncs[0].meeting_id);
            syncs.map(el => {
                console.log(el.meeting_id.activities);
                let sync = el.meeting_id.activities.find(activity => activity === el.activity);
                setSyncByAct((syncbyAct) => [...syncbyAct, { activity: sync, result: el.result, time: el.time }]);
            });
        }
    }, [syncs])

    useEffect(() => {
        if (!isEmpty(syncbyAct)) {
            let size = true;
            let activity1 = syncbyAct;
            let a = activity1[0].activity;

            while (size) {
                let filterd = activity1.filter(el => el.activity === a);
                console.log('filterd', filterd);
                let obj = { activity: filterd[0].activity, result: [], time: [] }
                filterd.map(el => {
                    obj.result.push(Number(el.result));
                    obj.time.push(el.time);
                })
                setSyncObjs((syncObjs) => [...syncObjs, obj]);

                size = filterd.length < syncbyAct.length;
                console.log(filterd.length, syncbyAct.length);
                if (size) {
                    activity1 = syncbyAct;
                    a = activity1[filterd.length + 1].activity;
                }
            }
        }
    }, [syncbyAct])


    useEffect(() => {
        if (!isEmpty(syncObjs)) {
            if (syncObjs.length === 1) {
                setAllSync(syncObjs[0].result)
            }
            else if (syncObjs.length > 1) {
                let arr = [];
                syncObjs.map(el => {
                    el.result.map(r =>
                        arr.push(r)
                    )
                })
                setAllSync(arr);
            }
        }
    }, [syncObjs])

    console.log('allSync', allSync);

    const chartData = {
        type: 'area',
        height: 95,
        options: {
            chart: {
                id: 'support-chart',
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 1
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: 'Ticket '
                },
                marker: {
                    show: false
                }
            }
        },
        series: [
            {
                data: !isEmpty(allSync) ? allSync : [0, 15, 10, 50, 30, 40, 25]
            }
        ]
    };

    return (
        <Card sx={{ bgcolor: 'rgb(237, 231, 246)' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                Total Sync
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                {totalSync}%
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                        {time}
                    </Typography>
                </Grid>
            </Grid>
            <Chart {...chartData} />
        </Card>
    );
}

export default PurpleChartCard;