import { activities } from './activities'

const activitiesFilter = limitations => {
    let system_activity_offers = [];
    if (limitations) {
        Object.keys(activities)
            .filter(key => !limitations.includes(key))
            .reduce((obj, key) => {
                obj[key] = activities[key];
                system_activity_offers = obj;
                return obj;
            }, {});
        // console.log(system_activity_offers);
        return system_activity_offers;
    }
    //all activity is good
    else {
        system_activity_offers = activities;
        return activities;
    }
};

export default activitiesFilter;