import React from 'react';
import PurpleChartCard from '../charts/PurpleChartCard';

function SyncView({ selectedVideo, syncs }) {
    return (
        <>
            <PurpleChartCard time={(selectedVideo?.date)} totalSync={'37'} syncs={syncs} />
        </>
    );
}

export default SyncView;