import React from 'react';
import { useSelector } from 'react-redux';

function AllTraineePage(props) {
    const userList = useSelector(state => state.profile.trainees_profiles);

    return (
        <div>

        </div>
    );
}

export default AllTraineePage;