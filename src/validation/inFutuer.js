const inFutuer = (meetingTime, currentTime) => {
    //let currentTime = new Date().setSeconds(0, 0);
    if (typeof currentTime === 'string') {
        currentTime = new Date(currentTime);
        currentTime = currentTime.getTime();
    }
    if (typeof meetingTime === 'string') {
        meetingTime = new Date(meetingTime);
    }

    let upcomingMeeting = meetingTime.getTime();
    console.log('====================================');
    console.log(currentTime, '<', upcomingMeeting, 'is: ', currentTime < upcomingMeeting);
    console.log('====================================');

    if (currentTime < upcomingMeeting) return true;
    else return false;
}
export default inFutuer;