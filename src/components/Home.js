import Admin from './Admin.js'
import Profile from './Profile.js'
import useAuth from '../hooks/useAuth';

const Home = () => {

    const ROLES = {
        "User": 100,
        "Admin":777
    }
    const { auth } = useAuth();

    return (
        <>
            {auth?.roles.includes(ROLES.Admin) ? (<Admin/>) : (<Profile/>)}
        </>
    )
}

export default Home;