import { useEffect, useState } from "react";
import BooksList from "./BooksList";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
    const controller = new AbortController();
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState({});
    const [shelf, setShelf] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        const getUser = async () => {
            setIsLoading(true);
            try {
                const response = await axiosPrivate.get('/users/me', {
                signal: controller.signal
                });

                setUser(response.data)
            } catch (err) {
                console.error(err)
            }
            setIsLoading(false);
        }
        getUser()
    },[])

    useEffect(() => {
        const getShelf = async () => {
            if (user?.email) {
                setIsLoading(true);
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
                setIsLoading(false);
            }
        }
        getShelf()
    }, [user])

    return (
        <>
            <header style={{display: "flex", justifyContent: "space-between"}}>
                <h1>Hi {user?.name}</h1>
            </header>
            <section className="mt-4">
                <h3>Currently reading</h3>
                {shelf?.currentlyReading ? <BooksList booksId={shelf?.currentlyReading}/> : ''}
            </section>
            <section className="mt-4">
                <h3>Want to read</h3>
                {shelf?.wantToRead ? <BooksList booksId={shelf?.wantToRead}/> : ''}
            </section>
            <section className="mt-4">
                <h3>Read</h3>
                {shelf?.read ? <BooksList booksId={shelf?.read}/> : ''}
            </section>

            {isLoading &&
                <ClipLoader
                    color="#566270"
                    cssOverride={{
                        position: 'fixed',
                        top: '50vh',
                        left: '50vw'
                    }}
                    loading
                    aria-label="Loading Spinner"
                    size={75}
                    speedMultiplier={0.75}
                />
            }
        </>
    )
}

export default Profile;