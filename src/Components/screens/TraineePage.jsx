import React from 'react';
import { useLocation } from 'react-router-dom';

function TraineePage(props) {
    const location = useLocation();
    console.log("location", location)

    return (
        <div>
            trainee
        </div>
    );
}

export default TraineePage;