import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import BooksList from "./BooksList";
import {FaRegWindowClose}from "react-icons/fa" 
import {FaCogs} from "react-icons/fa"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useLogout from '../hooks/useLogout';

const Profile = () => {

    const navigate = useNavigate();
    const logout = useLogout();
    const controller = new AbortController();
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState({});

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    useEffect(()=> {
      const getUser = async () => {
        try {
        const response = await axiosPrivate.get('/users/me', {
          signal: controller.signal
        });

        setUser(response.data)
      } catch (err) {
        console.error(err)
      }}

      getUser()
    },[])

    const [wantToReadBooks, setWantToReadBooks] = useState([
        {
            title: 'Book 1',
            author: 'sdas',
            id:1,
            img: 'asdas'
        },
        {
            title: 'Book2',
            author: 'sdafsddzs',
            id:2,
            img: 'asdas'
        },
        {
            title: 'Book 3',
            author: 'sfdsd',
            id:3,
            img: 'asdas'
        },
    ]);

    return (
        <>
            <header style={{display: "flex", justifyContent: "space-between"}}>
                <h1>Hi {user?.name}</h1>
                <div style={{fontSize: "2em", paddingRight: "0.5em"}}>
                    <Link to="/settings" state={{user: user}}><FaCogs style={{marginRight: "0.5em"}} color={"black"}/></Link>
                    <button onClick={signOut}><FaRegWindowClose color={"black"}/></button>
                </div>
            </header>
            <section>
                <h3>Currently reading</h3>
                <BooksList books={wantToReadBooks}/>
            </section>
            <section>
                <h3>Want to read</h3>
                <BooksList books={wantToReadBooks}/>
            </section>
            <section>
                <h3>Read</h3>
                <BooksList books={wantToReadBooks}/>
            </section>
            
        </>
    )
}

export default Profile;