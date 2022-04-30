import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, Typography } from '@mui/material';
import Chart from "react-apexcharts";
import isEmpty from '../../validation/isEmpty';
import Loader from '../loder/Loder';

function HeatMapChart({ syncObjs, series }) {
    const [options, setOptions] = useState({
        chart: {
            type: "heatmap",
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
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.1,
                colorScale: {
                    ranges: [
                        { from: 100000, to: 1000000, name: "very low", color: "#c0e0c3" },
                        { from: 1000000, to: 5000000, name: "medium", color: "#50bccd" },
                        { from: 5000000, to: Infinity, name: "high", color: "#e08283" }
                    ]
                }
            }
        },
        dataLabels: { enabled: true, style: { colors: ["#104c6d"] } },
        xaxis: {
            labels: {
                show: true,
                rotate: -45,
                rotateAlways: true,
                trim: true,
                maxHeight: 120,
                style: {
                    colors: [],
                    fontSize: "12px",
                    cssClass: "apexcharts-xaxis-label"
                },
                offsetX: 0,
                offsetY: 0
            }
        }
    });

    // const [series, setSeries] = useState([
    //     {
    //         name: "S1",
    //         data: [
    //             { x: "01", y: 5 },
    //             { x: "02", y: 5 },
    //             { x: "03", y: 1 },
    //             { x: "04", y: 5 },
    //             { x: "05", y: 1 },
    //             { x: "06", y: 5 },
    //             { x: "07", y: 1 },
    //             { x: "08", y: 5 },
    //             { x: "09", y: 1 },
    //             { x: "10", y: 1 },
    //             { x: "11", y: 5 },
    //             { x: "12", y: 1 },
    //             { x: "13", y: 5 },
    //             { x: "14", y: 1 },
    //             { x: "15", y: 1 },
    //             { x: "16", y: 1 },
    //             { x: "17", y: 1 },
    //             { x: "18", y: 1 },
    //             { x: "19", y: 1 },
    //             { x: "20", y: 1 },
    //             { x: "21", y: 5 },
    //             { x: "22", y: 1 },
    //             { x: "23", y: 5 },
    //             { x: "24", y: 1 },
    //             { x: "25", y: 1 },
    //             { x: "26", y: 1 },
    //             { x: "27", y: 1 },
    //             { x: "28", y: 1 },
    //             { x: "29", y: 1 },
    //             { x: "30", y: 1 },
    //         ]
    //     },
    //     {
    //         name: "S2",
    //         data: [
    //             { x: "08:00", y: 1 },
    //             { x: "09:00", y: 1 },
    //             { x: "10:00", y: 3 }
    //         ]
    //     },
    //     {
    //         name: "S3",
    //         data: [
    //             { x: "08:00", y: 0 },
    //             { x: "09:00", y: 0 },
    //             { x: "10:00", y: 0 }
    //         ]
    //     },
    //     {
    //         name: "S4",
    //         data: [
    //             { x: "08:00", y: 6 },
    //             { x: "09:00", y: 3 },
    //             { x: "10:00", y: 18 }
    //         ]
    //     },
    //     {
    //         name: "S5",
    //         data: [
    //             { x: "08:00", y: 0 },
    //             { x: "09:00", y: 0 },
    //             { x: "10:00", y: 0 }
    //         ]
    //     },
    //     {
    //         name: "S6",
    //         data: [
    //             { x: "08:00", y: 3 },
    //             { x: "09:00", y: 2 },
    //             { x: "10:00", y: 2 }
    //         ]
    //     },
    //     {
    //         name: "S7",
    //         data: [
    //             { x: "08:00", y: 4 },
    //             { x: "09:00", y: 1 },
    //             { x: "10:00", y: 2 }
    //         ]
    //     },
    //     {
    //         name: "S8",
    //         data: [
    //             { x: "08:00", y: 3 },
    //             { x: "09:00", y: 2 },
    //             { x: "10:00", y: 2 }
    //         ]
    //     }
    // ]);

    console.log('====================================');
    console.log(series);
    console.log('====================================');
    return (
        <>
            {
                !isEmpty(series) && series.length !== 0
                    ? <Chart options={options} series={series} type="heatmap" />
                    : <Loader />
            }
        </>
    );
}

export default HeatMapChart;