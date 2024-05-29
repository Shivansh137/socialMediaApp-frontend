import decode from 'jwt-decode'
import { useSelector } from 'react-redux';
import { selectToken } from '../features/auth/authSlice';

const useAuthData = () => {
    const token = useSelector(selectToken);
    if (token) {
        const { username, name, profilePic } = decode(token);

        return { username, name, profilePic };

    }
    else return { message: "Unauthorized" }
}
export default useAuthData;