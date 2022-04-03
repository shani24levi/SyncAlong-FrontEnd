import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled, Grid, Avatar, IconButton, Typography } from '@mui/material';
import { Favorite, LinkedIn } from '@mui/icons-material';
import Divider from '@mui/material/Divider';

import HeaderTrainee from './HeaderTrainee';
import MainConextTrainee from './MainConextTrainee';
import ScrollTop from '../scrollToTop/ScrollTop';

const Wrapper = styled('div')`
  font-family: 'Circular Std';
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  width: '100vw';
  background-color: #242424;
  color: #f5f5f5;
`;

const TextWrapper = styled('div')`
  width: 100%;
  .show-more {
    font-weight: 400;
    color: #d4d4d4;
    font-size: 16px;
  }

  .show-more-anchor {
    color: grey;
  }
  .show-more-anchor:hover {
    color: palevioletred;
  }
  .MuiTypography-root {
    font-family: 'Circular Std';
  }
`;

const Banner = styled('div')`
  background-color: #7f5a83;
  background-image: linear-gradient(120deg, #7f5a83 0%, #0d324d 74%);
  /* background-image: linear-gradient(90deg, #3512b2, #d18873); */

  width: 100%;
  height: 180px;
`;
const Container = styled(Grid)`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  /* background: #393939; */
  font-family: inter;
`;

const PhotoWrapper = styled('div')`
  padding: 16px;
  display: flex;
  flex-direction: row;

  div {
    padding: 2px 8px;
  }
`;

const Photo = styled('div')`
  width: 50px;
  .MuiAvatar-root {
    height: 100px;
    width: 100px;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translate(0, -50%);
  }
`;


function TraineeView({ trainee }) {
    const location = useLocation();
    const [page, setPage] = useState(1);
    //console.log('id', id, location.state.trainee);

    return (
        <>
            <Wrapper>
                <Banner />
                <Grid
                    container
                    height="100%"
                    justifyContent="center"
                    sx={{ background: '#242424', padding: '0rem 1rem' }}>
                    <Container item>
                        <PhotoWrapper>
                            <Photo>
                                <Avatar
                                    src={trainee.user.avatar}
                                    sx={{
                                        bgcolor: "#ddd", //lightGreen[500],
                                        padding: '0px !important',
                                        border: '5px solid #3E3E42',
                                    }}>
                                </Avatar>
                            </Photo>
                            <span style={{ flexGrow: 1 }}></span>
                            <IconButton
                                target="_blank"
                                href={"linkedIn"}
                                aria-label="linkedIn"
                                size="large"
                                color="primary">
                                <LinkedIn fontSize="inherit" />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    console.log('like');
                                }}
                                aria-label="add to wish list"
                                size="large"
                            //color={heart}
                            >
                                <Favorite fontSize="inherit" />
                            </IconButton>
                        </PhotoWrapper>

                        <TextWrapper>
                            <Typography variant="h5" fontWeight={700}>
                                Hi, I m {trainee.user.user}
                            </Typography>
                            <Typography fontWeight={600} sx={{ py: 1 }}>
                                {'job_title'} at {"company"}
                            </Typography>
                        </TextWrapper>

                        <Grid container sx={{ py: 2 }}>
                            <Grid
                                container
                                direction="column"
                                item
                                xs={12}
                                md={6}
                                spacing={1}>
                                <Grid item fontWeight={700}>
                                    Expertise
                                </Grid>
                                <Grid item>{("expertise")}</Grid>
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                item
                                xs={12}
                                md={6}
                                spacing={1}>
                                <Grid item fontWeight={700}>
                                    Languages
                                </Grid>
                                <Grid item>{("language")}</Grid>
                            </Grid>
                        </Grid>
                        <Divider />

                        {/* adding select here */}
                        {/* <Grid item xs={12} md={4} sx={{ paddingTop: '1rem' }}>
              <div style={{ margin: '1rem 0rem' }}>
                <Select
                  menuPlacement="auto"
                  name="Topic"
                  options={motivationOptions}
                  // @ts-ignore
                  onChange={({ value }) => {
                    setMotivation(value);
                    setPage(1);
                  }} // Value - label
                  isSearchable={true}
                  classNamePrefix="select"
                  placeholder={<span>Filter by Motivation</span>}
                />
              </div>
            </Grid> */}

                        {/* <Grid container width="100%">
              <PaginatedBookingCard
                motivation={motivation}
                topics={topics}
                page={page}
                setPage={setPage}
              />
            </Grid> */}
                    </Container>
                </Grid>
            </Wrapper>


            <Container maxWidth="xl">
                <div id="back-to-top-anchor" />
                <HeaderTrainee trainee={trainee} />
                <MainConextTrainee trainee={trainee} />
                <ScrollTop />

            </Container>
        </>
    );
}

export default TraineeView;