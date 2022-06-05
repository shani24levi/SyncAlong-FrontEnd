import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import isEmpty from '../../validation/isEmpty';
import { capitalize } from '../../helpers';

function AreaActivities({ MeetingDisplay }) {
    const [series, setSeries] = useState(null);
    console.log('====================================');
    console.log('MeetingDisplay', MeetingDisplay);
    console.log('====================================');

    useEffect(() => {
        let arrSirise = [];
        if (!isEmpty(MeetingDisplay.resultByActivities) && MeetingDisplay.resultByActivities.length !== 0) {
            MeetingDisplay.resultByActivities.map(el => arrSirise.push({ name: capitalize(el.activity), data: el.series }))
        }
        setSeries(arrSirise);
    }, [MeetingDisplay])

    console.log('seriesseries', series);

    const chartData = {
        type: 'area',
        height: 450,
        series: isEmpty(series) ? [] : series,
        options: {
            chart: {
                height: 450,
                type: 'area',
                // toolbar: {
                //     show: true,
                //     tools: {
                //         download: false,
                //         selection: false,
                //         zoom: false,
                //         zoomin: false,
                //         zoomout: false,
                //         pan: false,
                //         reset: false
                //     },
                //}
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

        // options: {
        //     chart: {
        //         id: 'support-chart',
        //         sparkline: {
        //             enabled: true
        //         }
        //     },
        //     stroke: {
        //         curve: 'smooth',
        //         width: 1
        //     },
        //     markers: {
        //         colors: ['#5e35b1', '#4527a0', '#673ab7']
        //     },
        //     dataLabels: {
        //         style: {
        //             colors: ['#5e35b1', '#4527a0', '#673ab7']
        //         }
        //     },
        //     fill: {
        //         colors: "#4527a0",
        //         opacity: 0.9,
        //         type: 'gradient',
        //         gradient: {
        //             shadeIntensity: 1,
        //             opacityFrom: 0.5,
        //             opacityTo: 0.5,
        //             stops: [0, 100],
        //             color: "#4527a0"
        //         }
        //     },
        //     colors: ['#5e35b1', '#b39ddb', '#4527a0'],

        //     tooltip: {
        //         fixed: {
        //             enabled: false
        //         },
        //         x: {
        //             show: false
        //         },
        //         y: {
        //             title: 'Ticket '
        //         },
        //         marker: {
        //             show: false
        //         }
        //     },
        //     // xaxis: {
        //     //     type: 'datetime',
        //     //     categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        //     //   },
        // },
        // series: [{
        //     name: 'series1',
        //     data: [31, 40, 28, 51, 42, 109, 100]
        // }, {
        //     name: 'series2',
        //     data: [11, 32, 45, 32, 34, 52, 41]
        // }],
    };

    return (
        <Card sx={{ bgcolor: 'rgb(237, 231, 246)' }}>
            <Chart {...chartData} />
        </Card>
    );
}

export default AreaActivities;