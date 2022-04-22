import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

function RecordView({ setStatus, statusBool, setStatusBool, setMediaBlobUrl }) {
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
    console.log('statusBool', statusBool);
    if (statusBool) handleStartRecording(startRecording);
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
    console.log('stop', status);
    setIsRecording(false);
    stopRecording();
    console.log('stop', status);
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
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container justifyContent='space-between'>
          <Button onClick={() => handleStartRecording(startRecording)}>
            Start Recording
          </Button>
          <Typography >status: {status}</Typography>
          <Button onClick={() => handleStopRecording(stopRecording)}>
            Stop Recording
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}

export default RecordView;