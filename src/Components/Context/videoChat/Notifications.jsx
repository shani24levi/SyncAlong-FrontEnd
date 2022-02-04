import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from '../ContextProvider';

function Notifications() {
    const { answerCall, call, callAccepted, isConnectedFriend } = useContext(SocketContext);

    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {
                        !isConnectedFriend
                            ?
                            <h1>{call.name} is not connected to the system:</h1>
                            :
                            <>
                                <h1>{call.name} is calling:</h1>
                                <Button variant="contained" color="primary" onClick={answerCall}>
                                    Answer
                                </Button>
                            </>
                    }
                    {/* <h1>{call.name} is calling:</h1>
                    <Button variant="contained" color="primary" onClick={answerCall}>
                        Answer
                    </Button> */}
                </div>
            )}
        </>
    );
}

export default Notifications;