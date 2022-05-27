import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import isEmpty from '../../validation/isEmpty';
import { capitalize } from '../../helpers';

function ColoredLines({ bgcolored, lineColore, series, syncAvgs }) {
    const theme = useTheme();

    console.log('el', syncAvgs);
    const chartData = {
        series: [{
            name: capitalize(syncAvgs.activity),
            data: series //[10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
            chart: {
                height: 450,
                type: 'line',
                zoom: {
                    enabled: false
                },
                sparkline: {
                    enabled: true
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false
                    },
                    width: "100%"
                }
            },
            dataLabels: { enabled: true, style: { colors: ["#104c6d"] } },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: '',
                align: 'left'
            },
            colors: [lineColore],
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
        },
    };


    return (
        <Card sx={{ bgcolor: bgcolored }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }} style={{ fontSize: 'larger', fontWeight: 'bold' }}>
                                {capitalize(syncAvgs.activity)}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                {Math.trunc(syncAvgs.avg * 100)}%
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {
                !isEmpty(series) && !isEmpty(chartData) &&
                <div style={{ padding: '5%' }}>  <Chart {...chartData} /> </div>
            }

        </Card>
    );
}

export default ColoredLines;