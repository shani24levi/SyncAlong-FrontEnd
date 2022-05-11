import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import isEmpty from '../../validation/isEmpty';

function DonutAvg({ series, labels }) {
    const chartData = {
        type: 'donut',
        height: 380,
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
    };

    return (
        <>
            <Chart {...chartData} />
        </>
    );
}

export default DonutAvg;