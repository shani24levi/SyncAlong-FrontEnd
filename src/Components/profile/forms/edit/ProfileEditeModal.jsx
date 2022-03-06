import React from 'react';
import { Modal } from '@material-ui/core';
import {
    Typography,
    Button,
    makeStyles,
    Avatar, Box,
    Grid,
} from "@material-ui/core";
import About from '../create/About';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #fff',
    borderRaduis: '2px',
    boxShadow: 24,
    p: 4,
};

function ProfileEditeModal({
    modalIsOpen, handelClose,
    address, setAddress,
    phone, setPhone,
    city, setCity,
    contry, setContry,
    age, setAge,
    gender, setGender,
    hobbies, setHobbies,
    about, setAbout,
    setChaged,
    changed,
    submitted,
    handelEditeAbout
}) {
    return (
        <Modal
            open={modalIsOpen}
            onClose={() => handelClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit About
                </Typography>
                <About
                    address={address} setAddress={setAddress}
                    phone={phone} setPhone={setPhone}
                    city={city} setCity={setCity}
                    contry={contry} setContry={setContry}
                    age={age} setAge={setAge}
                    gender={gender} setGender={setGender}
                    hobbies={hobbies} setHobbies={setHobbies}
                    about={about} setAbout={setAbout}
                    setChaged={setChaged}
                    changed={changed}
                    submitted={submitted}
                    editProfile={true}
                    handelEditeAbout={handelEditeAbout}
                />
            </Box>
        </Modal>
    );
}

export default ProfileEditeModal;