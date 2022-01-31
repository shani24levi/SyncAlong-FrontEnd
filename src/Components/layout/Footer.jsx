import React from 'react';
import { Link } from "react-router-dom";
import {
    Container, Button, Typography
} from "@material-ui/core";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { makeStyles } from "@material-ui/core/styles";
import componentStyles from "../../assets/material-ui-style/componenets/footer";
const useStyles = makeStyles(componentStyles);


const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container>
                <Typography variant="h6" component="h6" mt={2}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    Developed 2022 , Made with
                    <FavoriteBorderIcon fontSize='large' align='cente' />
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer;