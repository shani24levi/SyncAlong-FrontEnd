import setAuthToken from '../Utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const decoded = () => {
    if (localStorage.user) {
        setAuthToken(localStorage.user);
        const decoded = jwt_decode(localStorage.user);
        console.log('decoded', decoded);
        return decoded;
    }
    return null;
}
