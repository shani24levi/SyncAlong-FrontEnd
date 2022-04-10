import { string } from "prop-types";

export const getMonth = m => {
    switch (m) {
        case 0:
            return 'Jen';
        case 1:
            return 'Feb'
        case 2:
            return 'Mar'
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'Aug';
        case 8:
            return 'Sep';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        case 11:
            return 'Des';
        default:
            break;
    }
};

export const getDay = d => {
    switch (d) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon'
        case 2:
            return 'Tost';
        case 3:
            return 'Weds';
        case 4:
            return 'Terst';
        case 5:
            return 'Friday';
        case 6:
            return 'Sater';
        default:
            break;
    }
};

export const dateFormat = (s) => {
    s = new Date(s);
    let dateStr = `${getDay(s.getDay())} , ${s.getDate()} ${getMonth(s.getMonth())} , ${s.getHours()}:${s.getMinutes()}`;
    return dateStr;
}