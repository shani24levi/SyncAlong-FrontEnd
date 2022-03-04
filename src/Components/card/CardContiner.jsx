import React from 'react';
import { Card } from '@mui/material'
import { styled, Box } from '@mui/system'

const CardRoot = styled(Card)(() => ({
    padding: '20px 24px',
    marginTop: '10px'
}))

const CardTitle = styled('div')(({ subtitle }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    marginBottom: !subtitle && "16px",
}))

function CardContiner({ children, title, subtitle, icon }) {
    return (
        <CardRoot elevation={6}>
            <CardTitle subtitle={subtitle}>
                {title}
            </CardTitle>
            {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
            {children}
        </CardRoot>
    );
}

export default CardContiner;