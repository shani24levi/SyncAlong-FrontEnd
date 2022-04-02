import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { capitalize } from '../../helpers';

//info :   https://www.youtube.com/watch?v=nX_xDBR_gqo

function ErrorAlert({ name = '', title }) {
    useEffect(() => {
        notify()
    }, [])

    const notify = () => toast.error(capitalize(name) + title,
        {
            autoClose: 10000,
            position: toast.POSITION.BOTTOM_RIGHT
        });

    return (
        <div>
            {/* <button onClick={notify}>Notify!</button> */}
            <ToastContainer />
            {/* <ToastContainer /> */}
        </div>
    );
}

export default ErrorAlert;