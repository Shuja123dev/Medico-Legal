import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const token = Cookies.get('token');

const useAuthentication = () => {
    const navigate = useNavigate();
    if (token) {
        return true;
    }
    else {
        navigate("/signin")
        return false;
    }
}

export default useAuthentication
