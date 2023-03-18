import useAuth from './useAuth';
import axios from '../api/axios';

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        setAuth(prev => {
            console.log('prev token: ',JSON.stringify(prev));
            console.log('refresh: ', response.data.accessToken);
            return {
                ...prev, 
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });

        return response.data.accessToken;
    }

    return refresh
};

export default useRefreshToken;