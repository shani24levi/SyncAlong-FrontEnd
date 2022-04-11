import React from 'react';
import LimitationCard from '../../trainee/LimitationCard';

function Limits({ profile, setModalIsOpen }) {
    return (
        <LimitationCard profile={profile} />
    );
}

export default Limits;