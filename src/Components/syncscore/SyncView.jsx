import React, { useEffect, useState, useRef } from 'react';
import HeatMapChart from '../charts/HeatMapChart';
import PurpleChartCard from '../charts/PurpleChartCard';
import isEmpty from '../../validation/isEmpty';
import { dateFormat } from '../../Utils/dateFormat';

function SyncView({ selectedVideo, syncs }) {
    let [syncbyAct, setSyncByAct] = useState([]);
    let [syncObjs, setSyncObjs] = useState([]);
    let [allSync, setAllSync] = useState([]);
    let [avgSync, setAvgSync] = useState(null);

    const [series1, setSeries1] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (!isEmpty(syncs)) {
            console.log('syncs', syncs, syncs[0].meeting_id);
            syncs.map(el => {
                let sync = el.meeting_id.activities.find(activity => activity === el.activity);
                setSyncByAct((syncbyAct) => [...syncbyAct, { activity: sync, result: el.result, time: el.time }]);
            });
        }
    }, [])

    useEffect(() => {
        console.log('syncbyAct', syncbyAct);
        if (!isEmpty(syncbyAct) && isEmpty(allSync)) {
            let size = true;
            let activity1 = syncbyAct;
            let a = activity1[0].activity;
            let len = syncbyAct.length;

            while (size) {
                let filterd = activity1.filter(el => el.activity === a);
                //  console.log('filterd', filterd);
                let obj = { activity: filterd[0].activity, result: [], time: [] }
                filterd.map(el => {
                    obj.result.push(Number(el.result));
                    obj.time.push(el.time);
                })
                setSyncObjs((syncObjs) => [...syncObjs, obj]);

                size = filterd.length < len;
                //  console.log(filterd.length, len, len - filterd.length);
                if (size) {
                    activity1 = activity1.slice(filterd.length + 1, len) //activity1[filterd.length + 1].activity;
                    a = activity1[0].activity;
                    console.log(activity1);
                    len = a.length;
                }
            }
        }
    }, [syncbyAct])

    useEffect(() => {
        if (!isEmpty(syncObjs) && isEmpty(allSync)) {
            console.log('syncObjs', syncObjs);
            if (syncObjs.length === 1) {
                setAllSync(syncObjs[0].result)
            }
            else if (syncObjs.length > 1) {
                let arr = [];
                syncObjs.map(el => {
                    el.result.map(r =>
                        arr.push(r)//Math.trunc(r * 100))
                    )
                })
                setAllSync(arr);
            }

            console.log('====================================');
            console.log('!isEmpty(syncObjs)', !isEmpty(syncObjs));
            console.log('====================================');
            if (!isEmpty(syncObjs)) {
                console.log('d', syncObjs);
                let sum = 0;
                let count = 1;

                syncObjs.map((el, index) => {
                    console.log('el', el);
                    let arr = [];
                    let j = 1;
                    el.result.map((result, i) => {
                        if (sum === 0) sum = result;
                        if (i !== 0 && el.time[i] === el.time[i - 1]) {
                            sum = sum + result;
                            count = count + 1;
                            console.log('jjjj', el.time[i], el.time[i - 1], "sum", sum);
                        }
                        else {
                            console.log("sss", sum, count, sum / count);
                            let avg = sum / count;
                            arr.push({ x: j, y: Math.trunc(avg * 10) });
                            sum = 0;
                            count = 1;
                            j++;
                            console.log('arr', arr);
                        }
                    });
                    //console.log('arr', arr);
                    setSeries1(series1 => [...series1, { name: el.activity, data: arr }])
                });
            }

        }
    }, [syncObjs])

    useEffect(() => {
        console.log('allSync', allSync, isEmpty(allSync));
        if (!isEmpty(allSync)) {
            let sum = 0;
            allSync.map(i => {
                sum = sum + i
            })
            let avg = sum / allSync.length;
            setAvgSync(Math.trunc(avg * 100));
        }
    }, [allSync])

    useEffect(() => {
        if (!isEmpty(series1)) {
            setSeries(series1);
        }
    }, [series1])

    return (
        <>
            <PurpleChartCard time={dateFormat(selectedVideo.dateEnd)} totalSync={avgSync} syncs={allSync} />
            <HeatMapChart syncObjs={syncObjs} series={series} />
        </>
    );
}

export default SyncView;