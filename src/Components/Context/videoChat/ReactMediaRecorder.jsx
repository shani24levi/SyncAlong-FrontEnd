import React,{ useEffect, useRef, useState }  from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

function RecordView({setStatus,statusBool, setStatusBool, setMediaBlobUrl}) {
    const {
        startRecording,
        stopRecording,
        error,
        status,
        mediaBlobUrl
      } = useReactMediaRecorder({
        screen: true,
        facingMode: { exact: "environment" }
      });

      useEffect(() => {
          console.log('statusBool',statusBool);
          if(statusBool) handleStartRecording(startRecording);
          else handleStopRecording(stopRecording);
      }, [statusBool])
      
  const [isRecording, setIsRecording] = useState(false);
  const handleStartRecording = (startRecording) => {
    console.log('start');
    setIsRecording(true);
    startRecording();
    setStatusBool(true);
    setStatus(status);
  };
  const handleStopRecording = (stopRecording) => {
      console.log('stop',status);
    setIsRecording(false);
    stopRecording();
    console.log('stop',status);
    setStatusBool(false)
    setStatus(status);
    setMediaBlobUrl(mediaBlobUrl)
  };

  useEffect(() => {
    setMediaBlobUrl(mediaBlobUrl)
  }, [mediaBlobUrl])
  
  useEffect(() => {
    setStatus(status);
  }, [status])

  useEffect(() => {
    setStatus(status);
    setMediaBlobUrl(mediaBlobUrl)
  }, [statusBool])

  return (
          <div>
            <p>status: {status}</p>
            <button onClick={() => handleStartRecording(startRecording)}>
              Start Recording
            </button>
            <button onClick={() => handleStopRecording(stopRecording)}>
              Stop Recording
            </button>
            {!isRecording && (
              <video src={mediaBlobUrl} controls autoPlay loop />
            )}
          </div>
  );
}

export default RecordView;