import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import isEmpty from '../../validation/isEmpty';

function PurpleChartCard({ time, totalSync, syncs }) {
    const theme = useTheme();

    console.log('syncs', syncs);

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
                name: 'sync',
                data: !isEmpty(syncs) ? syncs : [0, 15, 10, 50, 30, 40, 25]
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
                                {totalSync ? totalSync : 0}%
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