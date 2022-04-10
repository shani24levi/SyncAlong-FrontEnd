import React from 'react';
import { Typography } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CreateMeeting from './form/CreateMeeting';

function MeetingModal({ modalIsOpen, modalCreate, modalData, handelClose }) {
    return (
        <Dialog
            open={modalIsOpen}
            onClose={() => handelClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DialogContent>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {modalCreate ? 'New Meeting' : 'Edit Meeting'}
                </Typography>
                <CreateMeeting modalData={modalData} modalCreate={modalCreate} handelClose={handelClose} />
            </DialogContent>
        </Dialog>
    );
}

export default MeetingModal;