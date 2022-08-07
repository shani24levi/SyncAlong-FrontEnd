import React from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import ChevronLeftOutlined from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlined from '@mui/icons-material/ChevronRightOutlined';
import { StyledIconButton } from './Carousel.styles';
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useSwiper } from 'swiper/react'

export const StyledButton = styled(Button)(({ theme }) => ({
    background: 'rgb(59,57,57,0.4)',
    textTransform: 'none',
    color: '#f5f5f5',
    fontWeight: 700,
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


function CarouselToolbarBottom({ prevRef, nextRef }) {
    const swiper = useSwiper()
    return (
        <div
            style={{
                margin: '0 2rem 1.5rem 1rem',
            }}>
            <Stack direction="row" alignItems="center" justifyContent='center' spacing={2} >
                <div>
                    <StyledIconButton
                        onClick={() => swiper.slidePrev()}
                        aria-label="previous-page"
                        size="medium"
                        ref={prevRef}>
                        <ChevronLeftOutlined fontSize="inherit" />
                    </StyledIconButton>
                </div>
                <div>
                    <StyledIconButton aria-label="next page" size="medium" ref={nextRef}
                        onClick={() => swiper.slideNext()}
                    >
                        <ChevronRightOutlined fontSize="inherit" />
                    </StyledIconButton>
                </div>
            </Stack>
        </div>
    )
}

export default CarouselToolbarBottom;