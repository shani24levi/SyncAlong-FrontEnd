import React from 'react';
import { Grid, Card, Icon, IconButton, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { styled, alpha } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Avatar, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'

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
    // '& Typography': {
    //     color: theme.palette.text.secondary,
    // },
    '& .icon': {
        opacity: 0.6,
        fontSize: '44px',
        //color: theme.palette.primary.main,
    },
}))

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    // marginTop: '4px',
    fontWeight: '500',
    fontSize: '14px',
    // color: theme.palette.primary.main,
}))


function StartCard({ title, subtitle, avatar, trainee }) {
    const navigate = useNavigate();

    return (
        <StyledCard elevation={6}>
            <ContentBox>
                <Avatar
                    alt="avatar"
                    src={avatar}
                />
                <PersonIcon className="icon" />
                <Box ml="12px">
                    <Typography>{title}</Typography>
                    <Heading>{subtitle}</Heading>
                </Box>
            </ContentBox>
            <Tooltip title="View Details" placement="top">
                <Button endIcon={<ArrowRightAltIcon />} onClick={() => navigate('/trainee/view', { state: { trainee_id: trainee.user._id, trainee: trainee } })}>
                </Button>
            </Tooltip>
        </StyledCard>

    )
}
export default StartCard;