import React from 'react';
import { Container, Box, Grid } from "@material-ui/core";

const TitleHeader = ({ title, description }) => {
    return (
        <Container maxWidth="xl">
            <Box marginBottom="6rem" textAlign="center"
                paddingTop="4rem"
            >
                <Box
                    component={Grid}
                    container
                    justifyContent="center"
                >
                    <Grid item lg={5} md={6} xs={12}>
                        <h1>{title}</h1>
                        <Box
                            component="p"
                            lineHeight="1.7"
                            fontSize="1rem"
                        >
                            {description}
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default TitleHeader;