import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Container } from '@material-ui/core';
import Loader from '../../../loder/Loder';
import { dateFormat } from '../../../../Utils/dateFormat';
import { capitalize } from '../../../../helpers';
import PurpleChartCard from '../../../charts/PurpleChartCard';
import SyncView from '../../../syncscore/SyncView';
import isEmpty from '../../../../validation/isEmpty';

function VideoDetail({ video, syncs }) {
    const user = useSelector(state => state.auth.user);

    console.log('====================================');
    console.log(video, syncs);
    console.log('====================================');

    return (
        <>

            {video && syncs ?
                <>
                    {
                        !isEmpty(syncs)
                            ? <SyncView selectedVideo={video} syncs={syncs} />
                            : <Loader />
                    }
                </>
                :
                <Loader />
            }
        </>
    );
}

export default VideoDetail;