import React, { useEffect, useState, useRef } from 'react';
import { Card } from '@mui/material';
import Chart from 'react-apexcharts';
import isEmpty from '../../validation/isEmpty';
import { capitalize } from '../../helpers';

function AreaActivities({ MeetingDisplay }) {
    const [series, setSeries] = useState(null);

    useEffect(() => {
        let arrSirise = [];
        if (!isEmpty(MeetingDisplay.resultByActivities) && MeetingDisplay.resultByActivities.length !== 0) {
            MeetingDisplay.resultByActivities.map(el => arrSirise.push({ name: capitalize(el.activity), data: el.series }))
        }
        setSeries(arrSirise);
    }, [MeetingDisplay])

    const chartData = {
        type: 'area',
        height: 450,
        series: isEmpty(series) ? [] : series,
        options: {
            chart: {
                height: 450,
                type: 'area',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ["00", "03", "06", "09", "12", "15", "18", "21", "24", "27", "30"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },
    };

    return (
        <Card sx={{ bgcolor: 'rgb(237, 231, 246)' }}>
            <Chart {...chartData} />
        </Card>
    );
}

export default AreaActivities;