import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Card, Avatar, Button, Tooltip, Typography, Box } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    // background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const ContentBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& .icon': {
        opacity: 0.6,
        fontSize: '44px',
    },
}))

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    fontWeight: '500',
    fontSize: '14px',
}))


function StartCard({ title, subtitle, avatar, m }) {
    const navigate = useNavigate();

    return (
        <StyledCard elevation={6}>
            <ContentBox>
                <Avatar
                    alt="avatar"
                    src={avatar}
                />
                <Box ml="12px">
                    <Typography>{title}</Typography>
                    <Heading>{subtitle}</Heading>
                </Box>
            </ContentBox>
            <Tooltip title="View Details" placement="top" arrow>
                <Button endIcon={<ArrowRightAltIcon />} onClick={() => navigate(`/meeting/watch/${m._id}`)}>
                </Button>
            </Tooltip>
        </StyledCard>
    )
}
export default StartCard;