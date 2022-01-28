import React from 'react';
import { Link } from "react-router-dom";
import {
    Container, Button, Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import componentStyles from "../../assets/material-ui-style/componenets/footer";
const useStyles = makeStyles(componentStyles);


const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            'sksksksksk'
            <Container>
                <h3 className="title">Follow us:</h3>
                <div className="btn-wrapper profile">
                    <Button
                        className="btn-icon btn-neutral btn-round btn-simple"
                        color="default"
                        href="https://twitter.com/creativetim"
                        id="tooltip622135962"
                        target="_blank"
                    >
                        <i className="fab fa-twitter" />
                    </Button>
                    <Typography delay={0} target="tooltip622135962">
                        Follow us
                    </Typography>
                    <Button
                        className="btn-icon btn-neutral btn-round btn-simple"
                        color="default"
                        href="https://www.facebook.com/creativetim"
                        id="tooltip230450801"
                        target="_blank"
                    >
                        <i className="fab fa-facebook-square" />
                    </Button>
                    <Typography delay={0} target="tooltip230450801">
                        Like us
                    </Typography>
                    <Button
                        className="btn-icon btn-neutral btn-round btn-simple"
                        color="default"
                        href="https://dribbble.com/creativetim"
                        id="tooltip318450378"
                        target="_blank"
                    >
                        <i className="fab fa-dribbble" />
                    </Button>
                    <Typography delay={0} target="tooltip318450378">
                        Follow us
                    </Typography>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;