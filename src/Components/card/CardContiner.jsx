import React, { useEffect } from 'react';
import { Card } from '@mui/material'
import { styled, Box } from '@mui/system'
import { Typography } from '@mui/material';

const CardRoot = styled(Card)(() => ({
    padding: '20px 24px',
    marginTop: '10px'
}))

function CardContiner({ children, title, subtitle, icon }) {
    return (
        <CardRoot elevation={6}>
            <Typography
                variant="h5"
                sx={{ fontWeight: 700, flexGrow: 1 }}>
                {title}
            </Typography>
            {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
            {children}
        </CardRoot>
    );
}

export default CardContiner;