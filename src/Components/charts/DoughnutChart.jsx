import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import isEmpty from '../../validation/isEmpty';
import Loader from '../loder/Loder';
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ height, meetings_complited }) {
    const traineesProfile = useSelector(state => state.profile.trainees_profiles);
    const [t_labal, setT_Labal] = useState([]);
    const [t_data, setT_Data] = useState([]);
    const [data, setData] = useState(null);

    useEffect(() => {
        let traineesLabals = [];
        let traineesData = [];
        if (!isEmpty(meetings_complited) && !isEmpty(traineesProfile)) {
            traineesProfile.map(el => {
                let count = 0;
                meetings_complited.map(t => {
                    if (el.user._id === t.trainee._id)
                        count++;
                })
                traineesLabals.push(el.user.username);
                traineesData.push(count);
            })
        }
        setT_Labal(traineesLabals);
        setT_Data(traineesData);
    }, [meetings_complited, traineesProfile])

    useEffect(() => {
        if (t_labal.length !== 0 && t_data.length !== 0) {
            const data = {
                labels: t_labal,
                datasets: [
                    {
                        label: '# of Votes',
                        data: t_data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };
            setData(data);
        }
    }, [t_labal, t_data])

    return (
        <>
            {
                data
                    ?
                    <Doughnut
                        data={data}
                        style={{ height: height }}
                    />
                    :
                    <Loader />
            }
        </>
    );
}

export default DoughnutChart;