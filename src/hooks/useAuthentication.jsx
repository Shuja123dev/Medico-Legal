import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';


const useAuthentication = () => {
    const token = Cookies.get('token');
    // console.log(token);
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
