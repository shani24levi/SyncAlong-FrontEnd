import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { capitalize } from '../../helpers';

//chack for later - maybe use this instad ... 
// https://github.com/shivanshBTW/material-react-toastify

function SeccsesAlert({ name = '', title }) {
    useEffect(() => {
        notify()
    }, [])

    const notify = () => toast(capitalize(name) + title,
        { autoClose: 10000 });

    return (
        <div>
            <ToastContainer />
        </div>
    );
}

export default SeccsesAlert;