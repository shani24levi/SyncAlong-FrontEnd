import React, { useEffect, useState, useRef } from 'react';
import isEmpty from '../../validation/isEmpty';
import Loader from '../loder/Loder';
import Chart from "react-apexcharts";

function ColumnSyncs({ data }) {
    const options = {
        chart: {
            type: "bar",
            toolbar: {
                show: true,
                tools: {
                    download: false,
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
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Total_AVG', 'Last Meeting AVG', 'Top 5 meetings avg'],
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return " " + val + "%"
                }
            }
        }

    }

    return (
        <>
            {
                !isEmpty(options) && !isEmpty(data) && data.length !== 0
                    ? <Chart options={options} series={data} type="bar" height={350} />
                    : <Loader />
            }
        </>
    );
}

export default ColumnSyncs;