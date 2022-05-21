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
            height: 30,
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
                maxHeight: 70,
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