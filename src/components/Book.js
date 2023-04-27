import { FaRegEdit } from  'react-icons/fa'
import BookCoverPlaceholder from '../images/book-cover-placeholder.png';
import { useEffect, useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes/';
const Book = ({bookId}) => {

    const [book, setBook] = useState({});

    useEffect(() => {
        const getBook = async () => {
            const response = await axios.get(`${GOOGLE_BOOKS_API}${bookId}`);
            setBook(response.data);
        };
        getBook();
    },[bookId])

    const desc = book?.volumeInfo?.description || 'Brak opisu';

    return (
    <div className="item d-flex" id={book?.id}>
        <div><img src={book?.volumeInfo?.imageLinks?.thumbnail || BookCoverPlaceholder} alt="Book cover placeholder"/></div>
        <div style={{'width': '100%'}}>
            <h4 style={{fontWeight: "bold", display: "flex", justifyContent: "space-between"}}>
                {book?.volumeInfo?.title} 
                <Link to={`/book/${book?.id}`}><FaRegEdit/></Link>
            </h4>
            <h5 style={{'fontWeight':'bold'}}>{book?.volumeInfo?.subtitle}</h5>
            <h5>{book?.voulumeInfo?.authors}</h5>
            <p>{book?.volumeInfo?.publisher}, {book?.volumeInfo?.publishedDate}</p>
            <br/>
            <div className='truncateLongTexts'>{desc}</div>
        </div>
    </div>
    )
}

export default Book;