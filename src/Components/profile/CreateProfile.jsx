import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import UserCard from './UserCard';
import ProfileForm from './ProfileForm';
import { makeStyles } from "@material-ui/core";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { CircularProgress } from '@mui/material';

import buttonsStyles from "../../assets/theme/buttons";
import UserProfile from './forms/create/UserProfile';
import About from './forms/create/About';
import Limitations from './forms/create/Limitations';
const buttonStyle = makeStyles(buttonsStyles);

const steps = ['User', 'About', 'Limitations'];

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
        1: <ManageAccountsIcon />,
        2: <SettingsIcon />,
        3: <DoNotDisturbAltIcon />,
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

function getStepContent(step) {
    switch (step) {
        case 0:
            return <UserProfile />;
        case 1:
            return <About />;
        case 2:
            return <Limitations />;
        default:
            throw new Error('Unknown step');
    }
}

const CreateProfile = (props) => {
    const btnClasses = buttonStyle();
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => { setActiveStep(activeStep + 1); };
    const handleBack = () => { setActiveStep(activeStep - 1); };

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Create Profile
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
                                    {activeStep !== 0 && (
                                        <Button
                                            className={btnClasses.blueRound}
                                            variant="contained"
                                            onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        className={btnClasses.purpleRound}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish & Create' : 'Next'}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </>
                </Paper>
            </Container>
        </>
    );
}

{/* <Grid container spacing={1}>
                <UserCard />
                <ProfileForm />
            </Grid> */}
export default CreateProfile;