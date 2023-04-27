import { useEffect, useState } from "react";
import BooksList from "./BooksList";
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Profile = () => {

    const controller = new AbortController();
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState({});
    const [shelf, setShelf] = useState({});

    useEffect(()=> {
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get('/users/me', {
                signal: controller.signal
                });

                setUser(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        getUser()
    },[])

    useEffect(() => {
        const getShelf = async () => {
            if (user?.email) {
                try {
                    const response = await axiosPrivate.post('/shelves/my-shelf', 
                    { 'email':  user?.email},
                    {
                        signal: controller.signal
                    });

                    setShelf(response.data)
                } catch (err) {
                    console.error(err)
                }
            }
        }

        getShelf()
    }, [user])

    return (
        <>
            <header style={{display: "flex", justifyContent: "space-between"}}>
                <h1>Hi {user?.name}</h1>
            </header>
            <section>
                <h3>Currently reading</h3>
                {shelf?.currentlyReading ? <BooksList booksId={shelf?.currentlyReading}/> : ''}
            </section>
            <section>
                <h3>Want to read</h3>
                {shelf?.wantToRead ? <BooksList booksId={shelf?.wantToRead}/> : ''}
            </section>
            <section>
                <h3>Read</h3>
                {shelf?.read ? <BooksList booksId={shelf?.read}/> : ''}
            </section>
        </>
    )
}

export default Profile;