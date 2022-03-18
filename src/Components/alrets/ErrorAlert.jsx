import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//info :   https://www.youtube.com/watch?v=nX_xDBR_gqo

function ErrorAlert({ title }) {
    useEffect(() => {
        notify()
    }, [])

    const notify = () => toast.error(title,
        { autoClose: 10000 });

    return (
        <div>
            {/* <button onClick={notify}>Notify!</button> */}
            <ToastContainer />
            {/* <ToastContainer /> */}
        </div>
    );
}

export default ErrorAlert;