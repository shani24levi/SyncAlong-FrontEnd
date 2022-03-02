import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { makeStyles } from "@material-ui/core";

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import componentStyles from "../../../../assets/material-ui-style/componenets/profile";
const useStyles = makeStyles(componentStyles);

function LimitationItem({ area }) {
    const classes = useStyles();

    function iconsProps(area) {
        switch (area) {
            case 'arms':
                return <FavoriteBorder />
            case 'abdomen':
                return <FavoriteBorder />
            case 'legs_knees':
                return <FavoriteBorder />
            case 'lower_back':
                return <FavoriteBorder />
            case 'upper_back':
                return <FavoriteBorder />
            case 'none':
                return <FavoriteBorder />
            default:
                break;
        }
    }

    function iconsCheckedProps(area) {
        switch (area) {
            case 'arms':
                return <Favorite />
            case 'abdomen':
                return <Favorite />
            case 'legs_knees':
                return <Favorite />
            case 'lower_back':
                return <Favorite />
            case 'upper_back':
                return <Favorite />
            case 'none':
                return <Favorite />
            default:
                break;
        }
    }

    return (<>
        <Card className={classes.cardCheckbox}>
            <FormControlLabel
                value="top"
                control={<Checkbox color='secondary' icon={iconsProps(area)} checkedIcon={iconsCheckedProps(area)} />}
                label={area}
                labelPlacement="top"
            />
        </Card>
    </>
    );
}

export default LimitationItem;