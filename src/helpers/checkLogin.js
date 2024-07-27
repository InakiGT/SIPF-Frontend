import { decodeJwt } from 'jose';
import { useNavigate } from "@solidjs/router";

import { getToken, setToken } from "./token";

const checkLogin = () => {
    const navigate = useNavigate();
    const token = getToken();

    if ( !token ) {
        navigate('/login');
        
        return;
    }
    const decodeToken = decodeJwt(token);
    
    const currentTime = Math.floor(Date.now() / 1000);

    if ( decodeToken.exp < currentTime ) {
        setToken('');
        navigate('/login');
    }
}

export default checkLogin;