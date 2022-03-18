import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SeccsesAlert({ title }) {
    useEffect(() => {
        notify()
    }, [])

    const notify = () => toast({ title },
        { autoClose: 10000 });

    return (
        <div>
            <ToastContainer />
        </div>
    );
}

export default SeccsesAlert;