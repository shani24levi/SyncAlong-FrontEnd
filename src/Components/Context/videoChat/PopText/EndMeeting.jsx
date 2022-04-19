import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./style.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'none',
    p: 4,
};

function EndMeeting(props) {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [time, setTime] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            if (time !== 0)
                setTime(time - 1)
            if (time == 0) handleClose();
        }, 1000);
        return () => clearInterval(interval);
    }, [time])

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Box m="auto" className="container">
                        <Box m="auto">
                            <div className="sign">
                                <span className="fast-flicker">ReStart?</span>
                                <span className="flicker">Leave?</span>
                            </div>
                        </Box>
                    </Box>
                    <Box m="auto" className="loading">
                        <span className="loader-text" style={{ fontSize: '3em !importent' }}>{time}</span> <br />
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default EndMeeting;