import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../ContextProvider';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function SpeachRecognition(props) {
    const { setRecognition } = useContext(SocketContext);

    // useEffect(() => {
    //     startListening(); //start as 'on'
    // }, [])


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

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    );
}

export default SpeachRecognition;