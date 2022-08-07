import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../ContextProvider';

function Notifications() {
    const { setIsModalVisible, answerCall, call, callAccepted } = useContext(SocketContext);

    useEffect(() => {
        if (call.isReceivingCall && !callAccepted) {
            setIsModalVisible(true);
        } else setIsModalVisible(false);
    }, [call.isReceivingCall]);

    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {
                        <>
                            <h1>{call.name} is calling:</h1>
                            <Button variant="contained" color="primary" onClick={answerCall}>
                                Answer
                            </Button>
                        </>
                    }
                </div>
            )}
        </>
    );
}

export default Notifications;