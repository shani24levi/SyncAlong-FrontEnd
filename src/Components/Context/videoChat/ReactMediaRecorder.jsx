import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

function RecordView({ setStatus, statusBool, setStatusBool, setMediaBlobUrl, setRecognition }) {
  const [mediaRecorderR, setMediaRecorderR] = useState();
  const [statusR, setStatusR] = useState();
  const [mediaBlobUrlR, setMediaBlobUrlR] = useState();

  useEffect(async () => { console.log("mediaRecorderR", mediaRecorderR) }, [mediaRecorderR]);
  useEffect(async () => { console.log("statusR", statusR), setStatus(statusR) }, [statusR]);
  useEffect(async () => { console.log("mediaBlobUrlR", mediaBlobUrlR); setMediaBlobUrl(mediaBlobUrlR) }, [mediaBlobUrlR]);

  const saveFile = async (recordedChunks) => {
    const blob = new Blob(recordedChunks, {
      type: 'video/mp4'
    });
    const myFile = new File([blob], 'demo.mp4', { type: 'video/mp4' });
    const urlFile = URL.createObjectURL(blob);
    setMediaBlobUrlR(myFile);
  }
  const createRecorder = async (streamP) => {
    // the stream data is stored in this array
    let recordedChunks = [];
    const mediaRecorder = new MediaRecorder(streamP);
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        console.log("data");
        recordedChunks.push(e.data);
      }
    };
    mediaRecorder.onstop = () => {
      saveFile(recordedChunks);
      recordedChunks = [];
    };
    mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
    setStatusR('recording');
    return mediaRecorder;
  }
  const recordScreen = async () => {
    return await navigator.mediaDevices
      .getDisplayMedia({ audio: true, video: { mediaSource: 'screen' } })
      .catch((e) => console.error(`error recorderScreen: ${e}`));
  };

  const startRecorder = async () => {
    const streamR = await recordScreen();
    console.log('start recorder streamR:', streamR);
    const mediaSourceR = await createRecorder(streamR);
    setMediaRecorderR(mediaSourceR);
    // mediaRecorderR = mediaSourceR;
  };

  const stopRecorder = async () => {
    console.log("mediaRecorderR", mediaRecorderR)
    mediaRecorderR && mediaRecorderR.state == "recording" && mediaRecorderR.stop();
    mediaRecorderR && setStatusR("stopped");
  }
  useEffect(() => {
    setStatusR("Idia");
    // startRecorder();
  }, []);

  useEffect(() => {
    console.log('statusBool', statusBool);
    if (statusBool) startRecorder();
    else stopRecorder();
  }, [statusBool])

  useEffect(() => {
    setStatus(statusR);
  }, [statusR])

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container justifyContent="space-between">
          <Button onClick={() => startRecorder()}>
            Start Recording
          </Button>
          <Typography>status: {statusR}</Typography>
          <Button
            onClick={() => {
              setRecognition('start');
            }}
          >
            Stop Recording
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}

export default RecordView;
