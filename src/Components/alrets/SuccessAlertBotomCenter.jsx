import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { capitalize } from '../../helpers';

function SuccessAlertBotomCenter({ name = '', title }) {
    useEffect(() => {
        notify()
    }, [])

    const notify = () => toast(capitalize(name) + title,
        {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_CENTER
        });

    return (
        <div>
            <ToastContainer />
        </div>
    );
}

export default SuccessAlertBotomCenter;