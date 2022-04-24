import React from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// core components style
import componentStyles from "./../assets/material-ui-style/componenets/auth-header";
const useStyles = makeStyles(componentStyles);

const WelcomContainer = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Box
            className={classes.header}
            position="relative"
            paddingTop="8rem"
            paddingBottom="8rem"
        >
            <Container maxWidth="xl">
                <Box marginBottom="6rem" textAlign="center">
                    <Box
                        component={Grid}
                        container
                        justifyContent="center"
                        color={theme.palette.grey[100]}
                    >
                        <Grid item lg={5} md={6} xs={12}>
                            <h1>Welcome!</h1>
                            <Box
                                component="p"
                                color={theme.palette.grey[400]}
                                lineHeight="1.7"
                                fontSize="1rem"
                            >
                                {/* <p>Join Us For ...</p> */}
                                physical activities and synchronized movements with positive energies.
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            {/* <Box
                position="absolute"
                zIndex="100"
                height="70px"
                top="auto"
                bottom="0"
                pointerEvents="none"
                left="0"
                right="0"
                width="100%"
                overflow="hidden"
                transform="translateZ(0)"
            >
                <Box
                    bottom="0"
                    position="absolute"
                    pointerEvents="none"
                    component="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                >
                    <Box
                        component="polygon"
                        fill="#172b4d"
                        points="2560 0 2560 100 0 100"
                    />
                </Box>
            </Box> */}
        </Box>
    );
}

export default WelcomContainer;