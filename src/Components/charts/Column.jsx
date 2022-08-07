import React, { useEffect, useState } from 'react';
import isEmpty from '../../validation/isEmpty';
import Loader from '../loder/Loder';
import Chart from "react-apexcharts";

function Column({ series, syncAvgs }) {
    const [categories, setCategories] = useState(null);
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);

    useEffect(() => {
        if (!isEmpty(series) && !isEmpty(syncAvgs)) {
            let max_avg_min = [];
            let seriesarr = [];
            let categories = [];
            let series_arr = [];
            let series_arr_2 = [];

            series.map(i => {
                i.data.map(j => {
                    series_arr.push(j.y);
                })
                series_arr_2.push(series_arr);
                series_arr = [];
            })

            syncAvgs.map((i, index) => {
                let avg = i.avg;
                max_avg_min.push(Math.trunc(Math.max(...series_arr_2[index]) * 10));
                max_avg_min.push(Math.trunc(avg * 100));
                let min = Math.trunc(Math.min(...series_arr_2[index]) * 10);
                if (min == 0) min = 1;
                max_avg_min.push(min);
                categories.push(i.activity)
                seriesarr.push({ name: i.activity, data: max_avg_min });
                max_avg_min = [];
            })
            setData(seriesarr);
            setCategories(categories);
        }
    }, [series, syncAvgs])


    useEffect(() => {
        if (!isEmpty(data) && !isEmpty(categories)) {
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
                    categories: ['MAX', 'AVG', 'MIN'],
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
            setOptions(options);
        }
    }, [data, categories])

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

export default Column;