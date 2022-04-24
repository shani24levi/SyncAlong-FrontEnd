import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateAvatarTraineePic } from '../../Store/actions/profileAction';
import {
    styled, Grid, Avatar, IconButton, Typography, Select,
    Box, Button, Dialog,
} from '@mui/material';

import isEmpty from '../../validation/isEmpty';
import Loader from '../loder/Loder';
import ScrollTop from '../scrollToTop/ScrollTop';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { capitalize } from '../../helpers';
import LimitationCard from '../profile/trainee/LimitationCard';
import About from '../profile/views/links/About';
import ProfileEditeModal from '../profile/forms/edit/ProfileEditeModal';


const Wrapper = styled('div')`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: '100%';
  color: #f5f5f5;
`;

const TextWrapper = styled('div')`
  width: 100%;
  letter-spacing: 5px;
  .show-more {
    font-weight: 400;
    color: #d4d4d4;
    font-size: 16px;
  }
  .show-more-anchor {
    color: grey;
  }
  .show-more-anchor:hover {
    color: palevioletred;
  }
  .MuiTypography-h5{
    letter-spacing: 5px !importent;
  }
`;

const Banner = styled('div')`
  background-color: #7f5a83;
  background-image: linear-gradient(120deg, #7f5a83 0%, #0d324d 74%);
  /* background-image: linear-gradient(90deg, #3512b2, #d18873); */

  width: 100%;
  height: 180px;
`;
const Container = styled(Grid)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PhotoWrapper = styled('div')`
  padding: 16px;
  display: flex;
  flex-direction: row;

  div {
    padding: 2px 8px;
  }
`;

const Photo = styled('div')`
  width: 50px;
  .MuiAvatar-root {
    height: 150px;
    width: 150px;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translate(0, -70%);
  }
`;

const Input = styled('input')({
    display: 'none',
});

const AvatarTrainee = styled(Avatar)({
    border: '3px solid white',
    // padding: '0px !important',
    "&:hover": {
        top: "-1px",
        opacity: 0.95,
        border: '4px solid #8c3db9',
        boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
    },
});


function TraineeProfile(props) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const trainees_profiles = useSelector(state => state.profile.trainees_profiles);
    const [trainee, setTrainee] = useState(null);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openUser, setOpenUser] = React.useState(false);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const [address, setAddress] = useState(trainee?.profile.address ? trainee?.profile.address : '');
    const [phone, setPhone] = useState(trainee?.profile.phone ? trainee?.profile.phone : '');
    const [city, setCity] = useState(trainee?.profile.city ? trainee?.profile.city : '');
    const [contry, setContry] = useState(trainee?.profile.contry ? trainee?.profile.contry : '');
    const [age, setAge] = useState(trainee?.profile.age ? trainee?.profile.age : '');
    const [gender, setGender] = useState(trainee?.profile.gender ? trainee?.profile.gender : '');
    const [hobbies, setHobbies] = useState(trainee?.profile.hobbies ? trainee?.profile.hobbies : '');
    const [about, setAbout] = useState(trainee?.profile.about ? trainee?.profile.about : '');
    const [changed, setChaged] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        if (id && !isEmpty(trainees_profiles) && !trainee) {
            trainees_profiles.map(i => {
                if (i.user._id === id) setTrainee(i);
            })
        }
    }, [])

    const setImgShow = (event) => {
        const imgData = {
            name: 'new img',
            img: event.target.files[0]
        };
        let formData = new FormData();
        formData.append('file', event.target.files[0]);

        console.log('formData', formData.getAll('file'));
        if (imgData) dispatch(updateAvatarTraineePic(formData, id));
    };


    const handelClose = () => {
        setModalIsOpen(false);
    }

    const handelEditeAbout = async () => {
        //api update call with all starts
        let data = {}
        if (address) data.address = address;
        if (phone) data.phone = phone;
        if (city) data.city = city;
        if (contry) data.contry = contry
        if (age) data.age = age
        if (gender) data.gender = gender
        if (hobbies) data.hobbies = hobbies
        if (about) data.about = about
        console.log("data after edit", data);
        //dispatch(updateProfile(data))
        setModalIsOpen(false);
    }

    return (
        <>
            <div id="back-to-top-anchor" />
            {
                trainee ?
                    <Wrapper>
                        <Banner />
                        <Grid
                            container
                            height="100%"
                            justifyContent="flex-start"
                            sx={{ padding: '0rem 4rem' }}>
                            <Container>
                                <PhotoWrapper>
                                    <Photo>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            '& > *': {
                                                m: 1,
                                            },
                                        }}
                                        >
                                            <label htmlFor="contained-button-file">
                                                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={setImgShow} />
                                                <Button component="span">
                                                    <Photo>
                                                        <AvatarTrainee
                                                            alt="avatar"
                                                            src={trainee.user.avatar}
                                                            sx={{
                                                                bgcolor: "#8c3db9",
                                                                padding: '0px !important',
                                                                border: '5px solid #8c3db9',
                                                            }}
                                                        />
                                                    </Photo>
                                                </Button>
                                            </label>
                                        </Box>
                                    </Photo>
                                    <span style={{ flexGrow: 1 }}></span>

                                    <IconButton
                                        onClick={() => setOpenDelete(true)}
                                        aria-label="add to wish list"
                                        size="large"
                                        color="inherit"
                                    >
                                        <DeleteIcon fontSize="large" />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => setOpenUser(true)}
                                        aria-label="go to trainee profile"
                                        size="large"
                                        color="inherit"
                                    >
                                        <EditIcon fontSize="large" />
                                    </IconButton>
                                </PhotoWrapper>

                                <TextWrapper>
                                    <Typography variant="h5" fontWeight={700}>
                                        {capitalize(trainee.user.user)}
                                    </Typography>
                                    <Typography fontWeight={600} sx={{ py: 1 }}>
                                        Role: {capitalize(trainee.user.role)}
                                    </Typography>
                                </TextWrapper>

                                <Grid container sx={{ py: 2 }} justifyContent={'space-around'} spacing={2}>
                                    <Grid
                                        item
                                        xs={6}
                                        md={4} lg={4}
                                    >
                                        <LimitationCard profile={trainee.profile} />
                                    </Grid>

                                    <Grid
                                        item
                                        xs={6}
                                        md={8} lg={8}
                                    >
                                        <About profile={trainee.profile} setModalIsOpen={setModalIsOpen} />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Wrapper>
                    :
                    <Loader />
            }
            <Dialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DaterPicker trainee={trainee} setOpen={setOpen} open={open} /> */}
            </Dialog>

            <ProfileEditeModal
                modalIsOpen={modalIsOpen}
                handelClose={handelClose}

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
                handelEditeAbout={handelEditeAbout}
            />
            <ScrollTop />
        </>
    );
}

export default TraineeProfile;