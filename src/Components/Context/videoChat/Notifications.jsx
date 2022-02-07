import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from '../ContextProvider';

function Notifications() {
    const { answerCall, call, myName, yourName, callAccepted, isConnectedFriend } = useContext(SocketContext);

    return (
        <>
            {/* {!isConnectedFriend && <h1>{yourName} is not connected to the system</h1>} */}
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