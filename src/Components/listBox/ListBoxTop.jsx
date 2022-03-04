import React from 'react';
import { Box, styled, useTheme } from '@mui/system'
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    MenuItem,
    Select,
    Typography
} from '@mui/material'
import { Button, Grid } from '@material-ui/core';
import VisibilityIcon from '@mui/icons-material/Visibility';

function ListBoxTop(props) {
    const CardHeader = styled('div')(() => ({
        paddingLeft: '24px',
        paddingRight: '24px',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }))

    const Title = styled('span')(() => ({
        fontSize: '1rem',
        fontWeight: '500',
        textTransform: 'capitalize',
    }))

    const ProductTable = styled(Table)(() => ({
        minWidth: 400,
        whiteSpace: 'pre',
        '& Typography': {
            height: 15,
            width: 50,
            borderRadius: 500,
            boxShadow:
                '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        },
        '& td': {
            borderBottom: 'none',
        },
        '& td:first-of-type': {
            paddingLeft: '16px !important',
        },
    }))

    const Small = styled('small')(({ bgcolor }) => ({
        height: 15,
        width: 50,
        color: '#fff',
        padding: '2px 8px',
        borderRadius: '4px',
        overflow: 'hidden',
        background: bgcolor,
        boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    }))

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>top sync scoure</Title>
                <Grid container alignItems='flex-end' justifyContent='flex-end'>
                    <Select size="small" defaultValue="this_month">
                        <MenuItem value="this_month">All Users</MenuItem>
                        <MenuItem value="last_month">Grama1</MenuItem>
                        <MenuItem value="last_month">Grama2</MenuItem>
                    </Select>

                    <Select size="small" defaultValue="this_month">
                        <MenuItem value="this_month">ToDay</MenuItem>
                        <MenuItem value="last_month">This 3 Days</MenuItem>
                        <MenuItem value="last_month">This Week</MenuItem>
                        <MenuItem value="last_month">This Month</MenuItem>
                    </Select>
                </Grid>
            </CardHeader>

            <Box overflow="auto">
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                Name
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Total Sync
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Session Time
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={1}>
                                View
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map((product, index) => (
                            <TableRow key={index} hover>
                                <TableCell
                                    colSpan={4}
                                    align="left"
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={product.imgUrl} />
                                        <Typography sx={{ m: 0, ml: 4 }}>
                                            {product.name}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    $
                                    {product.price > 999
                                        ? (product.price / 1000).toFixed(1) +
                                        'k'
                                        : product.price}
                                </TableCell>

                                <TableCell
                                    sx={{ px: 0 }}
                                    align="left"
                                    colSpan={2}
                                >
                                    {product.available ? (
                                        product.available < 20 ? (
                                            <Small bgcolor={'red'}>
                                                {product.available} available
                                            </Small>
                                        ) : (
                                            <Small bgcolor={'blue'}>
                                                in stock
                                            </Small>
                                        )
                                    ) : (
                                        <Small bgcolor={'bgError'}>
                                            out of stock
                                        </Small>
                                    )}
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={1}>
                                    <Button endIcon={<VisibilityIcon />} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>
            </Box>
        </Card>
    );
}


const productList = [
    {
        imgUrl: '/assets/images/products/headphone-2.jpg',
        name: 'earphone',
        price: 100,
        available: 15,
    },
    {
        imgUrl: '/assets/images/products/headphone-3.jpg',
        name: 'earphone',
        price: 1500,
        available: 30,
    },
    {
        imgUrl: '/assets/images/products/iphone-2.jpg',
        name: 'iPhone x',
        price: 1900,
        available: 35,
    },
    {
        imgUrl: '/assets/images/products/iphone-1.jpg',
        name: 'iPhone x',
        price: 100,
        available: 0,
    },
    {
        imgUrl: '/assets/images/products/headphone-3.jpg',
        name: 'Head phone',
        price: 1190,
        available: 5,
    },
]

export default ListBoxTop;