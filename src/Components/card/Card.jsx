import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// core components
import CardUI from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

import styles from "../../assets/material-ui-style/componenets/card.js";
import buttonsStyles from "../../assets/theme/buttons";
const useStyles = makeStyles(styles);
const buttonStyle = makeStyles(buttonsStyles);

function Card(props) {
    const classes = useStyles();
    const btnClasses = buttonStyle();

    const faces = [
        "http://i.pravatar.cc/300?img=1",
        "http://i.pravatar.cc/300?img=2",
        "http://i.pravatar.cc/300?img=3",
        "http://i.pravatar.cc/300?img=4"
    ];

    return (
        <></>
        // <CardUI className={classes.card}>
        //     <CardMedia className={classes.cardHeader}
        //         component="img"
        //         height="140"
        //         image="/avatar.png"
        //         alt="..."
        //     />
        //     <CardContent >
        //         <Typography gutterBottom variant="h5" >
        //             Lizard
        //         </Typography>
        //         <Typography variant="body2" color="text.secondary">
        //             Lizards are a widespread group of squamate reptiles, with over 6,000
        //             species, ranging across all continents except Antarctica
        //         </Typography>
        //         <Divider className={classes.divider} light />
        //         {faces.map(face => (
        //             <Avatar className={classes.avatar} key={face} src={face} />
        //         ))}
        //     </CardContent>
        //     <CardActions>
        //         <Button className={btnClasses.purpleRound} fullWidth size="small">Connect</Button>
        //         {/* <Button size="small">Learn More</Button> */}
        //     </CardActions>
        // </CardUI>
    );
}

export default Card;