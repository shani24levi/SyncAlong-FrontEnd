import React from 'react';
import { useSelector } from 'react-redux';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import "./style.css";
import { capitalize } from '../../../../helpers';


function Footer(props) {
    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.profile.profile);

    return (
        <footer className="footer">
            <section className="container">
                <section className="item">
                    <LocalPhoneIcon className="icon" />
                    <p>Call</p>
                    <p>{profile.phone}</p>
                </section>
                <section className="item">
                    <EmailIcon className="icon" />
                    <p>Email</p>
                    <p>{user.email}</p>
                </section>
                <section className="item">
                    <PersonPinIcon className="icon" />
                    <p>Role</p>
                    <p>{capitalize(user.role)}</p>
                </section>
                <section className="item">
                    <IconButton aria-label="fingerprint" color="secondary">
                        <EditIcon className="icon iconsEdit" />
                        <p>Edit User</p>
                    </IconButton>
                    <IconButton aria-label="fingerprint" color="secondary">
                        <DeleteIcon className="icon iconDelete" />
                        <p>Delete</p>
                    </IconButton>
                </section>
            </section>
        </footer>
    );
}

export default Footer;