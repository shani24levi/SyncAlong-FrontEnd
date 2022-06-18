import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../ContextProvider';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Container } from '@material-ui/core';

function SpeachRecognition(props) {
    const { setRecognition, mediaPipeInitilaize } = useContext(SocketContext);

    useEffect(() => {
        if (mediaPipeInitilaize)
            startListening(); //start as 'on'
    }, [mediaPipeInitilaize])

    const commands = [
        {
            command: ['אוקיי', 'אתחיל', 'התחיל', 'התחל', 'גו', 'start', 'go', 'ok', 'okay', 'start'],
            callback: () => { setRecognition('start') }
        },
        {
            command: ['עצור', 'תעצור', 'לעצור', 'stop', 'עצוב', 'צור'],
            callback: () => { setRecognition('stop') }
        },
        {
            command: ['המשך', 'להמשיך', 'continue'],
            callback: () => { setRecognition('continue') }
        },
        {
            command: ['אחורה', 'back', 'prev', 'בחורה', 'חורה'],
            callback: () => { setRecognition('prev') }
        },
        {
            command: ['קדימה', 'next'],
            callback: () => { setRecognition('next') }
        },
        {
            command: ['restart'],
            callback: () => { setRecognition('restart') }
        },
        {
            command: ['repeat'],
            callback: () => { setRecognition('repeat') }
        },
        {
            command: ['leave'],
            callback: () => { setRecognition('leave') }
        },
    ]

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const startListening = () => { SpeechRecognition.startListening({ continuous: true }) }

    return (<></>
        // <Container>
        //     <p>Microphone: {listening ? 'on' : 'off'}</p>
        //     <button onClick={startListening}>Start</button>
        //     <button onClick={SpeechRecognition.stopListening}>Stop</button>
        //     <button onClick={resetTranscript}>Reset</button>
        //     <p>{transcript}</p>
        // </Container>
    );
}

export default SpeachRecognition;