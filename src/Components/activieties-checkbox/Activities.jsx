import React from 'react';
import ActivityItem from './ActivityItem';
import {
    Typography,
    Grid,
} from "@material-ui/core";
import isEmpty from '../../validation/isEmpty';
import "./style.css";


function Activities({ activities, setActivities, arms, abdomen, legs_knees, lower_back, upper_back, allBody }) {
    console.log('arms', arms, !isEmpty(arms), arms?.length);
    return (
        <div className='scroll' style={{ overflow: "scroll", height: "300px" }}>
            {arms?.length !== 0 &&
                <>
                    <Grid container spacing={2}>
                        {/* <Typography variant="subtitle1" sx={{ mt: 2 }}>Arms area :</Typography> */}
                        {
                            arms?.length != 0 && arms?.map(activity => (
                                <Grid item xs={6} sm={4} key={activity}>
                                    <ActivityItem key={activity} activity={activity} setActivities={setActivities} activities={activities} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </>
            }
            {abdomen?.length !== 0 &&
                <>
                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>Abdomen area :</Typography>
                    <Grid container spacing={2}>
                        {
                            abdomen?.length != 0 && abdomen?.map(activity => (
                                <Grid item xs={6} sm={4} key={activity}>
                                    <ActivityItem key={activity} activity={activity} setActivities={setActivities} activities={activities} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </>
            }
            {legs_knees?.length !== 0 &&
                <>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Legs and Knees area :</Typography>
                    <Grid container spacing={2}>
                        {
                            legs_knees?.length != 0 && legs_knees?.map(activity => (
                                <Grid item xs={6} sm={4} key={activity}>
                                    <ActivityItem key={activity} activity={activity} setActivities={setActivities} activities={activities} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </>
            }

            {lower_back?.length !== 0 &&
                <>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Lower back area :</Typography>
                    <Grid container spacing={2}>
                        {
                            lower_back?.length != 0 && lower_back?.map(activity => (
                                <Grid item xs={6} sm={4} key={activity}>
                                    <ActivityItem key={activity} activity={activity} setActivities={setActivities} activities={activities} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </>
            }

            {upper_back?.length !== 0 &&
                <>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Upper back area :</Typography>
                    <Grid container spacing={2}>
                        {
                            upper_back?.length != 0 && upper_back?.map(activity => (
                                <Grid item xs={6} sm={4} key={activity}>
                                    <ActivityItem key={activity} activity={activity} setActivities={setActivities} activities={activities} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </>
            }

            {allBody?.length !== 0 &&
                <>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>all Body back area :</Typography>
                    <Grid container spacing={2}>
                        {
                            allBody?.length != 0 && allBody?.map(activity => (
                                <Grid item xs={6} sm={4} key={activity}>
                                    <ActivityItem key={activity} activity={activity} setActivities={setActivities} activities={activities} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </>
            }
        </div>
    );
}

export default Activities;