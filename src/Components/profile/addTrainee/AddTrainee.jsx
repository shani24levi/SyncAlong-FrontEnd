import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTrainee } from '../../../Store/actions/authAction';
import { createTraineeProfile } from '../../../Store/actions/profileAction';
import { useNavigate } from 'react-router-dom'
import CreateTraineeUser from './CreateTraineeUser';
import CreateTraineeProfile from './CreateTraineeProfile';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { CircularProgress } from '@mui/material';
import buttonsStyles from "../../../assets/theme/buttons";
import isValidEmail from '../../../validation/isValidEmail';
import isEmpty from '../../../validation/isEmpty';
const buttonStyle = makeStyles(buttonsStyles);


const steps = ['Create User', 'Create Profile'];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(165, 33, 242) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(165, 33, 242) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
    const icons = {
        1: <PersonAddIcon />,
        2: <ManageAccountsIcon />,
    };
    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

function AddTrainee(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const btnClasses = buttonStyle();
    const [activeStep, setActiveStep] = React.useState(0);
    const err = useSelector(state => state.errors);
    const auth = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);

    //1 page elements
    const [fullname, setFullName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    //2 page elements
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [contry, setContry] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [about, setAbout] = useState('');
    const [limitations, setLimitations] = useState([]);

    const [changed, setChaged] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErorrs] = useState({});

    useEffect(() => {
        if (profile.trinee_added) {
            setActiveStep(activeStep + 1)
        }
        if (profile.trinee_profile_created) {
            navigate('/profile')
        }

        let errors = {};
        if (err === 'Duplicate field value entered of email') {
            errors["email"] = "*email already exists";
        }
        if (err === 'Duplicate field value entered of usename') {
            errors["username"] = "*username already exists";
        }
        if (err === 'Please add a valid email') {
            errors["email"] = "*not valid email";
        }
        if (!isEmpty(errors))
            setErorrs(errors);
        return;
    }, [err, profile.trinee_added, profile.trinee_profile_created])


    const handleNext = () => {
        let errors = {}
        setChaged(false);
        setSubmitted(false);
        //handel 1 page move
        if (!username || !email || !isValidEmail(email) || !pass || pass.length < 6 || username.length < 2 || !fullname) {
            setSubmitted(true);
            if (fullname.length < 2) errors["fullname"] = "*Full name must be 2 digits long"
            if (!fullname) errors["fullname"] = "Full name is required"
            if (username.length < 2) errors["username"] = "*Username must be 2 digits long"
            if (!username) errors["username"] = "*User name required"
            if (!isValidEmail(email)) errors["email"] = "*Email not valid"
            if (!email) errors["email"] = "*Email required"
            if (!pass) errors["pass"] = "*Pass required"
            if (pass.length < 6) errors["pass"] = "*Pass must be 6 digits long"
        }
        if (isEmpty(errors) && activeStep == 0) {
            //do api call to craete user 
            let data = { username, email, password: pass } //named as in servre side
            if (fullname) data.user = fullname; //becouse its not a requiered element 
            console.log(data);
            dispatch(createTrainee(data))
            //whait for errors from db
        }
        // 2 page has no requied elemebnts 
        !isEmpty(errors) && setErorrs(errors);

        if (activeStep == 1) {
            //do api call to craete profile to elderly user data
            let data = {}
            if (address) data.address = address;
            if (phone) data.phone = phone;
            if (city) data.city = city;
            if (contry) data.contry = contry
            if (age) data.age = age
            if (gender) data.gender = gender
            if (hobbies) data.hobbies = hobbies
            if (about) data.about = about
            if (limitations.length !== 0) data.limitations = limitations
            console.log(profile.trinee_added?._id, data);
            dispatch(createTraineeProfile(profile.trinee_added?._id, data))
            //no requiers to creating a profile threfor no chacking inputs
            //maybe TODO - add chacking for valid phone number...
            setActiveStep(activeStep + 1)
        }
    };

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <CreateTraineeUser
                    setFullName={setFullName}
                    fullname={fullname}
                    setUserName={setUserName}
                    username={username}
                    setEmail={setEmail}
                    email={email}
                    setChaged={setChaged}
                    changed={changed}
                    submitted={submitted}
                    setPass={setPass}
                    pass={pass}
                    errors={errors}
                />;
            case 1:
                return <CreateTraineeProfile
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
                    limitations={limitations} setLimitations={setLimitations}
                />;
            default:
                throw new Error('Unknown step');
        }
    }
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Add User
                </Typography>
                <Stepper alternativeLabel activeStep={activeStep} sx={{ pt: 3, pb: 5 }} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <>
                    {activeStep === steps.length ? (
                        <>
                            <Box sx={{ mx: 'auto', textAlign: 'center', fontSize: '0.875rem', fontWeight: '700' }}>
                                <Typography variant="h6" gutterBottom >
                                    Craeting....
                                </Typography>
                                <CircularProgress color="secondary" />
                                <Typography variant="subtitle1">
                                    You will be transferred to your profile in a few seconds
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        <>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    className={btnClasses.purpleRound}
                                    disabled={profile.loading || auth.loading}
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {profile.loading || auth.loading ? (
                                        <CircularProgress color="secondary" />
                                    ) : (
                                        <> {activeStep === steps.length - 1 ? 'Create Profile' : 'Craete User'}</>
                                    )}

                                </Button>
                            </Box>
                        </>
                    )}
                </>
            </Paper>
        </Container>
    );
}

export default AddTrainee;