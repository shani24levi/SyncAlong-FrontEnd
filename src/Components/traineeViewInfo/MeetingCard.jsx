import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: '16px',
    borderRadius: '16px',
    color: 'rgb(4, 41, 122)',
    backgroundColor: 'rgb(208, 242, 255)'
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
        theme.palette.primary.dark,
        0.24
    )} 100%)`
}));

function MeetingCard(props) {
    return (
        <RootStyle>
            <IconWrapperStyle>
                <EventAvailableIcon icon="ant-design:android-filled" width={24} height={24} />
            </IconWrapperStyle>
            <Typography variant="h3">{'TIME'}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Weekly Sales
            </Typography>
        </RootStyle>
    );
}

export default MeetingCard;