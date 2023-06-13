import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import Button from "./Button";
import BookCoverPlaceholder from '../images/book-cover-placeholder.png';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes/';

const BookPage = () => {

    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [bookState, setBookState] = useState('');
    const [user, setUser] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();
    
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

    useEffect(()=> {
        const getBookState = async () => {
            try {
                const email = user.email;
                if (email && bookId) {
                    const response = await axiosPrivate.post('/shelves/check-book',{
                        email,
                        bookId
                    }, 
                    {
                        signal: controller.signal
                    });

                    setBookState(response.data)
                    }
            } catch (err) {
                console.error(err)
            }
        }
        getBookState();
    }, [user, bookId])

    useEffect(()=>{
        const getBook = async() => {
            const response = await axios.get(`${GOOGLE_BOOKS_API}${bookId}`);
            setBook(response.data);
        }
        getBook();
    },[bookId])

    const desc = {__html:book?.volumeInfo?.description || 'Brak opisu'};

    const handleSave = async () => {
        try {
            alert('Book has been saved');
            const email = user.email;
            const response = await axiosPrivate.put('/shelves/update-book',{
                email,
                bookId,
                'newState': bookState
            }, 
            {
                signal: controller.signal
            });

        } catch (err) {
            console.error(err)
            alert('Something went wrong')
        }
    }

    const removeFromShelves = async () => {
        try {
            alert('Book has been removed from your shelves')
            setBookState('')
            const email = user.email;
            const response = await axiosPrivate.put('/shelves/update-book',{
                email,
                bookId,
                'newState': ''
            }, 
            {
                signal: controller.signal
            });
        } catch (err) {
            console.error(err)
            alert('Something went wrong')
        }
    }

  return (
    <>
    <header className="d-flex justify-content-between align-items-center mb-2" style={{'paddingLeft': '2em', 'paddingRight': '2em'}}>
        <div>
            <h1>{book?.volumeInfo?.title}</h1>
            <h2 style={{'fontWeight':'bold'}}>{book?.volumeInfo?.subtitle}</h2>
            <h3>{book?.volumeInfo?.authors}</h3>
            <p>{book?.volumeInfo?.publisher}, {book?.volumeInfo?.publishedDate}</p>
        </div>
        <div>
            <img src={book?.volumeInfo?.imageLinks?.thumbnail || BookCoverPlaceholder} alt="cover" height="192px" style={{'border':'1px solid #000'}}/>
        </div>
    </header>

    <section style={{'paddingLeft': '2em', 'paddingRight': '2em', 'textAlign': 'center', 'marginBottom':'1.5em'}}>
        <div style={{'border':'1px solid #000', 'padding': '2em', 'display':'inline-block'}}>
            <h3>Your shelves</h3>
            <select value={bookState} onChange={(e) => setBookState(e.target.value)} className="mb-2">
                <option disabled value="">-- Select --</option>
                <option value="read">Read</option>
                <option value="currentlyReading">Currenly reading</option>
                <option value="wantToRead">Want to read</option>
            </select>
            <br/>
            <div className="d-flex flex-column gap-2 align-items-center">
                <Button text='Save' onClick={handleSave}/>
                <Button text='Remove from shelves' onClick={removeFromShelves} style={{'borderColor':'red', 'backgroundColor':'#ffa8a8'}}/>
            </div>
        </div>
    </section>

    <section style={{'paddingLeft': '2em', 'paddingRight': '2em'}}>
        <div dangerouslySetInnerHTML={ desc }></div>
    </section>
    </>
  )
}

export default BookPage