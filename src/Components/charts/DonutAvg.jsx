import React, { useEffect, useState, useRef } from 'react';
import Chart from 'react-apexcharts';
import isEmpty from '../../validation/isEmpty';

function DonutAvg({ syncAvgs }) {
    const [series, setSeries] = useState(null);
    const [options, setOptions] = useState(null);
    const [chartData, setData] = useState(null);

    useEffect(() => {
        if (!isEmpty(syncAvgs)) {
            let labals = [];
            let avgs = [];

            syncAvgs.map(i => {
                labals.push(i.activity);
                avgs.push(Math.trunc(i.avg * 100));
            })

            setSeries(avgs);
            setOptions(labals);
        }
    }, [syncAvgs])

    useEffect(() => {
        if (!isEmpty(series) && !isEmpty(options)) {
            const chartData = {
                type: 'donut',
                height: 380,
                options: {
                    chart: {
                        width: 380,
                        type: 'donut',
                        dropShadow: {
                            enabled: true,
                            color: '#111',
                            top: -1,
                            left: 3,
                            blur: 3,
                            opacity: 0.2
                        }
                    },
                    stroke: {
                        width: 0,
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                }
                            }
                        }
                    },
                    labels: options, // ["Comedy", "Action", "SciFi", "Drama", "Horror"],
                    dataLabels: {
                        enabled: false,
                        dropShadow: {
                            blur: 3,
                            opacity: 0.8
                        }
                    },
                    fill: {
                        type: 'gradient',
                    },
                    title: {
                        text: "Activies Syncs"
                    },

                },
                series: series, //[84, 55, 41, 17, 15],
                labels: options  //['A', 'B', 'C', 'D', 'E']
            };
            setData(chartData);
        }
    }, [series, options])

    return (
        <>
            {!isEmpty(chartData) &&
                <Chart {...chartData} />
            }
        </>
    );
}

export default DonutAvg;