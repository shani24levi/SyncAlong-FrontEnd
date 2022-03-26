import React, { useContext, useState, useEffect, useRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SyncScoreView from './../syncscore/SyncScoreView';

import { getSync } from '../../Store/actions/syncActions'
import { CircularProgress } from "@material-ui/core";
function MeetingReport(props) {
    const { setMyRole, setRoomId, setMySocketId, setYourSocketId, setYourInfo, setMyName, setYourName } = useContext(SocketContext);
    const [change, setChange] = useState(false);
    const [sync, setSync] = useState(null);
    let allSync = useSelector((state) => state.syncs?.all_syncs);
    const [you, setYou] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const meeting_id = location.state.meeting_id;
    const my_name = location.state?.me;
    const your_name = location.state?.you;

    useEffect(() => {
        console.log("meeting_id", meeting_id);
        if (!location.state.meeting_id) {
            dispatch(getSync('623c4681c0f0407bc2963b3a'));
            return;
        }
        dispatch(getSync(meeting_id));
    }, []);

    useEffect(() => {
        if (allSync) setSync(allSync);
    }, [allSync]);

    console.log("sync", sync)
    return (
        <>
            {sync ?
                <SyncScoreView meeting_id={meeting_id} my_name={my_name} your_name={your_name} />
                : <CircularProgress color="secondary" size="20px" />

            }
        </>
    );
}

export default MeetingReport;