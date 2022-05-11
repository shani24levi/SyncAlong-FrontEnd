import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import isEmpty from '../../validation/isEmpty';

function MultyChart({ syncs, time }) {
    console.log(syncs);
    const chartData = {
        type: 'area',
        height: 200,
        options: {
            chart: {
                id: "basic-bar",
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
                    show: false,
                    title: 'Ticket '
                },
                marker: {
                    show: false
                }
            },
            xaxis: {
                categories: !isEmpty(time) ? time : [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
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
        <>
            <Chart {...chartData} />
        </>
    );
}

export default MultyChart;