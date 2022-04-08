import React from 'react';
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import ChevronLeftOutlined from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlined from '@mui/icons-material/ChevronRightOutlined';
import { StyledIconButton } from './Carousel.styles';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)(({ theme }) => ({
    background: 'rgb(59,57,57,0.4)',
    textTransform: 'none',
    color: '#f5f5f5',
    fontWeight: 700,
    // Margin: '1rem',
    transition: 'all 0.2s ease-in-out',
    [theme.breakpoints.up('xs')]: {
        padding: '12px 6px',
    },
    [theme.breakpoints.up('sm')]: {
        padding: '12px 16px',
    },
    '&:hover': {
        opacity: 1,
        backgroundColor: '#424040',
        transform: 'scale(1.1) !important'
    },
}));

const CarouselToolbar = ({ prevRef, nextRef }) => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                margin: '0 2rem 1.5rem 1rem',
            }}>
            <Stack direction="row" alignItems="center">
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, flexGrow: 1, color: '#f5f5f5' }}>
                    Listed Users
                </Typography>
                <StyledButton sx={{ p: 2 }} onClick={() => navigate('/profile', { state: { to: 'usersTrainees' } })} >View All Users</StyledButton>
            </Stack>
        </div>
    )
};

export default CarouselToolbar;