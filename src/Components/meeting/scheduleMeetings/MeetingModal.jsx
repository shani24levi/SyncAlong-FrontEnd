import React from 'react';
import { Modal } from '@material-ui/core';
import {
    Typography,
    Button,
    makeStyles,
    Avatar, Box,
    Grid, styled
} from "@material-ui/core";
import CreateMeeting from './form/CreateMeeting';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #fff',
    borderRaduis: '2px',
    boxShadow: 24,
    p: 4,
};

const WrapperModal = styled(Modal)`
    border-radius: 2%;
    background-color: rgba(255, 2, 222, 0.2);
`;

function MeetingModal({ modalIsOpen, modalCreate, modalData, handelClose }) {
    return (
        <WrapperModal
            open={modalIsOpen}
            onClose={() => handelClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {modalCreate ? 'New Meeting' : 'Edit Meeting'}
                </Typography>
                <CreateMeeting modalData={modalData} modalCreate={modalCreate} handelClose={handelClose} />
            </Box>
        </WrapperModal>
    );
}

export default MeetingModal;