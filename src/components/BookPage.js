import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import Button from "./Button";
import BookCoverPlaceholder from '../images/book-cover-placeholder.png';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ClipLoader from "react-spinners/ClipLoader";
import Modal from 'react-bootstrap/Modal';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes/';

const BookPage = () => {

    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [bookState, setBookState] = useState('');
    const [user, setUser] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();
    const [isLoading, setIsLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [modalText, setModalText] = useState('')

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

    useEffect(()=> {
        const getBookState = async () => {
            setIsLoading(true);
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
            setIsLoading(false);
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
            setModalText('Book has been saved')
            handleShow();
            const email = user.email;
            await axiosPrivate.put('/shelves/update-book',{
                email,
                bookId,
                'newState': bookState
            },
            {
                signal: controller.signal
            });
        } catch (err) {
            setModalText('Something went wrong')
            handleShow();
            console.error(err)
        }
    }

    const removeFromShelves = async () => {
        try {
            setModalText('Book has been removed from your shelves')
            setBookState('')
            handleShow();
            const email = user.email;
            await axiosPrivate.put('/shelves/update-book',{
                email,
                bookId,
                'newState': ''
            },
            {
                signal: controller.signal
            });
        } catch (err) {
            setModalText('Something went wrong')
            handleShow();
            console.error(err)
        }
    }

  return (
    <>
    <header className="header bookPageHeader row">
        <div className="col-md-9">
            <h1>{book?.volumeInfo?.title}</h1>
            <h2>{book?.volumeInfo?.subtitle}</h2>
            <h3>{book?.volumeInfo?.authors}</h3>
            <p>{book?.volumeInfo?.publisher}, {book?.volumeInfo?.publishedDate}</p>
        </div>
        <div className="col-md-3 d-flex justify-content-center">
            <img src={book?.volumeInfo?.imageLinks?.thumbnail || BookCoverPlaceholder} alt="cover"/>
        </div>
    </header>

    <section className="bookPageContainer row">
        <div className="bookPageInfo col-md-6 col-sm-9">
            <h3>Your shelves</h3>
            <select value={bookState} onChange={(e) => setBookState(e.target.value)} className="mb-2">
                <option disabled value="">-- Select --</option>
                <option value="read">Read</option>
                <option value="currentlyReading">Currenly reading</option>
                <option value="wantToRead">Want to read</option>
            </select>
            <br/>
            <div className="bookStateControl">
                <Button text='Save' onClick={handleSave} className="bookSaveButton"/>
                <Button text='Remove from shelves' onClick={removeFromShelves} className="bookRemoveButton"/>
            </div>
        </div>
    </section>

    <section className="row">
        <div dangerouslySetInnerHTML={ desc }></div>
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

        {/* modal */}
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Body>{modalText}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose} text='ok, got it'/>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default BookPage