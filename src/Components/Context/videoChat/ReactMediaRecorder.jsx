import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

function RecordView({ setStatus, statusBool, setStatusBool, setMediaBlobUrl }) {

  // let mediaRecorderR = null;
  const [mediaRecorderR, setMediaRecorderR] = useState();
  const [statusR, setStatusR] = useState();
  const [mediaBlobUrlR, setMediaBlobUrlR] = useState();

  useEffect(async () => { console.log("mediaRecorderR", mediaRecorderR) }, [mediaRecorderR]);
  useEffect(async () => { console.log("statusR", statusR), setStatus(statusR) }, [statusR]);
  useEffect(async () => { console.log("mediaBlobUrlR", mediaBlobUrlR); setMediaBlobUrl(mediaBlobUrlR) }, [mediaBlobUrlR]);

  const saveFile = async (recordedChunks) => {
    const blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    const myFile = new File([blob], 'demo .mp4', { type: 'video/mp4' });
    const urlFile = URL.createObjectURL(myFile);
    console.log(myFile, urlFile);
    setMediaBlobUrlR(myFile);
  }
  const createRecorder = async (streamP, mimeTypeP) => {
    // the stream data is stored in this array
    let recordedChunks = [];
    const mediaRecorder = new MediaRecorder(streamP);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        // console.log("data");
        recordedChunks.push(e.data);
      }
    };
    mediaRecorder.onstop = () => {
      saveFile(recordedChunks);
      recordedChunks = [];
    };
    mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
    setStatusR(mediaRecorder.state);
    return mediaRecorder;
  }
  const recordScreen = async () => {
    return await navigator.mediaDevices
      .getDisplayMedia({ audio: true, video: { mediaSource: 'screen' } })
      .catch((e) => console.error(`error recorderScreen: ${e}`));
  };

  const startRecorder = async () => {
    const streamR = await recordScreen();
    const mimeType = 'video/webm';
    const mediaSourceR = await createRecorder(streamR, mimeType);
    setMediaRecorderR(mediaSourceR);
    // mediaRecorderR = mediaSourceR;
  };

  const stopRecorder = async () => {
    console.log("mediaRecorderR", mediaRecorderR)
    mediaRecorderR && mediaRecorderR.stop();
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

  // useEffect(() => {
  //   setMediaBlobUrl(mediaBlobUrl)
  // }, [mediaBlobUrlR])

  useEffect(() => {
    setStatus(statusR);
  }, [statusR])

  useEffect(() => {
    console.log('statusBool', statusBool)
    if (statusBool) {
      setStatus(statusR);
      setMediaBlobUrl(mediaBlobUrlR)
    } else {
      console.log('stop recorder');
      stopRecorder();
    }
  }, [statusBool])

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container justifyContent="space-between">
          <Button onClick={() => startRecorder()}>
            Start Recording
          </Button>
          <Typography>status: {statusR}</Typography>
          <Button onClick={() => stopRecorder()}>
            Stop Recording
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}

export default RecordView;

// import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
// import React, { useEffect, useRef, useState } from 'react';
// import { useReactMediaRecorder } from 'react-media-recorder';

// function RecordView({ setStatus, statusBool, setStatusBool, setMediaBlobUrl }) {
//   const {
//     startRecording,
//     stopRecording,
//     error,
//     status,
//     mediaBlobUrl
//   } = useReactMediaRecorder({ screen });
//   //   screen: true,
//   //   facingMode: { exact: "environment" },
//   //   blobPropertyBag: {
//   //     type: "video/mp4"
//   //   }
//   // });
//   useEffect(() => {
//     console.log('statusBool', statusBool);
//     if (statusBool) handleStartRecording(startRecording);
//     else handleStopRecording(stopRecording);
//   }, [statusBool])

//   const [isRecording, setIsRecording] = useState(false);
//   const handleStartRecording = (startRecording) => {
//     console.log('start');
//     setIsRecording(true);
//     startRecording();
//     setStatusBool(true);
//     setStatus(status);
//   };
//   const handleStopRecording = (stopRecording) => {
//     console.log('stop', status);
//     setIsRecording(false);
//     stopRecording();
//     console.log('stop', status);
//     setStatusBool(false)
//     setStatus(status);
//     setMediaBlobUrl(mediaBlobUrl)
//   };

//   useEffect(() => {
//     setMediaBlobUrl(mediaBlobUrl)
//   }, [mediaBlobUrl])

//   useEffect(() => {
//     setStatus(status);
//   }, [status])

//   useEffect(() => {
//     setStatus(status);
//     setMediaBlobUrl(mediaBlobUrl)
//   }, [statusBool])

//   return (
//     <Container>
//       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//         <Grid container justifyContent='space-between'>
//           <Button onClick={() => handleStartRecording(startRecording)}>
//             Start Recording
//           </Button>
//           <Typography >status: {status}</Typography>
//           <Button onClick={() => handleStopRecording(stopRecording)}>
//             Stop Recording
//           </Button>
//         </Grid>
//       </Box>
//     </Container>
//   );
// }

// export default RecordView;