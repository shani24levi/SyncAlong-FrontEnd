import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../Store/actions/profileAction';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import PropTypes from "prop-types";
import { Container, Grid } from '@material-ui/core';
import About from './views/links/About';
import Activities from './views/links/Activities';
import Limits from './views/links/Limits';
import TimeLine from './views/links/TimeLine';
import Videos from './views/links/Videos';
import NavigatProfileLInks from './views/NavigatProfileLInks';
import ViewProfileHeader from './views/ViewProfileHeader';
import ProfileEditeModal from './forms/edit/ProfileEditeModal';
import TraineesUsers from './views/links/TraineesUsers';

const ProfileView = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.profile.profile);
    const profileT = useSelector(state => state.profile);
    //console.log("profileT",profileT);
    const [link, setLink] = useState('about');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [address, setAddress] = useState(profile.address ? profile.address : '');
    const [phone, setPhone] = useState(profile.phone ? profile.phone : '');
    const [city, setCity] = useState(profile.city ? profile.city : '');
    const [contry, setContry] = useState(profile.contry ? profile.contry : '');
    const [age, setAge] = useState(profile.age ? profile.age : '');
    const [gender, setGender] = useState(profile.gender ? profile.gender : '');
    const [hobbies, setHobbies] = useState(profile.hobbies ? profile.hobbies : '');
    const [about, setAbout] = useState(profile.about ? profile.about : '');

    const [changed, setChaged] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErorrs] = useState({});

    useEffect(() => {
        if (location.state?.to) setLink(location.state.to);
    }, [location.state])

    const setView = (link) => {
        switch (link) {
            case 'usersTrainees':
                return <TraineesUsers profile={profile} />
            case 'about':
                return <About profile={profile} setModalIsOpen={setModalIsOpen} />
            case 'limits':
                return <Limits />
            case 'activity':
                return <Activities />
            case 'video':
                return <Videos />
            default:
                break;
        }
    }

    const handelClose = () => {
        setModalIsOpen(false);
    }

    const handelEditeAbout = async () => {
        //api update call with all starts
        let data = {}
        if (address) data.address = address;
        if (phone) data.phone = phone;
        if (city) data.city = city;
        if (contry) data.contry = contry
        if (age) data.age = age
        if (gender) data.gender = gender
        if (hobbies) data.hobbies = hobbies
        if (about) data.about = about
        console.log("data after edit", data);
        dispatch(updateProfile(data))
        setModalIsOpen(false);
    }

    return (
        <>
            <ProfileEditeModal
                modalIsOpen={modalIsOpen}
                handelClose={handelClose}

                address={address} setAddress={setAddress}
                phone={phone} setPhone={setPhone}
                city={city} setCity={setCity}
                contry={contry} setContry={setContry}
                age={age} setAge={setAge}
                gender={gender} setGender={setGender}
                hobbies={hobbies} setHobbies={setHobbies}
                about={about} setAbout={setAbout}
                setChaged={setChaged}
                changed={changed}
                submitted={submitted}
                handelEditeAbout={handelEditeAbout}
            />

            <ViewProfileHeader />
            <NavigatProfileLInks setLink={setLink} />

            <Container>
                {link && setView(link)}
            </Container>
        </>
    );
}

export default ProfileView;