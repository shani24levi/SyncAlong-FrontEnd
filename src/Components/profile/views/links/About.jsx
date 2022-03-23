import React from 'react';
import {
    Grid, Paper, Avatar, TextField, Button, Typography, Link, makeStyles,
    Card, CardContent, CardHeader, Box, FormControlLabel, Checkbox,
} from '@material-ui/core'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PhoneIcon from '@mui/icons-material/Phone';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import buttonsStyles from "../../../../assets/theme/buttons";
import CardContiner from '../../../card/CardContiner';
const buttonStyle = makeStyles(buttonsStyles);



function About({ profile, setModalIsOpen }) {
    const btnClasses = buttonStyle();
    const [open, setOpen] = React.useState(true);
    const [openHobbies, setOpenHobbies] = React.useState(true);


    const handleClick = () => {
        setOpen(!open);
    };
    const handleClickHobbies = () => {
        setOpenHobbies(!open);
    };

    return (
        <div>
            <CardContiner title="Profile About" >
                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton onClick={handleClick}>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="About Me" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary={!profile.about ? 'No about....' : profile.about} />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleClickHobbies}>
                        <ListItemAvatar>
                            <Avatar>
                                <SportsEsportsIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Hobbies" />
                        {openHobbies ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openHobbies} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <SportsBasketballIcon />
                                </ListItemIcon>
                                <ListItemText primary={!profile.hobbies ? 'No hobbies....' : profile.hobbies} />
                            </ListItemButton>
                        </List>
                    </Collapse>


                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <LocationCityIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={'Location : ' + profile.address} secondary={!profile.city || !profile.contry ? '' : profile.city + ',' + profile.contry} />
                    </ListItem>


                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PhoneIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Phone : ' secondary={profile.phone ? profile.phone : 'No phone number'} />
                    </ListItem>


                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {
                                    !profile.gender || profile.gender == "Mixed" ? <QuestionMarkIcon /> :
                                        <>{
                                            profile.gender == "Male" ? <ManIcon /> : <WomanIcon />
                                        }</>
                                }
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Gender : ' secondary={profile.gender ? profile.gender : 'No gander'} />
                    </ListItem>


                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <AccessTimeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Age : ' secondary={profile.age ? profile.age : 'yonge for ever'} />
                    </ListItem>

                </List>

                <Typography>
                    {profile._id}
                    {profile.address}
                    {profile.phone}
                    {profile.city}
                    {profile.age}
                    {profile.gender}
                    {profile.about}
                    {profile.hobbies}
                    {profile.age}
                </Typography>
                <Button onClick={() => setModalIsOpen(true)} className={btnClasses.purpleRoundEmpty}> Edit</Button>

            </CardContiner>

        </div>
    );
}

export default About;