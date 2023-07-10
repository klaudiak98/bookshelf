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

    const  htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
    const desc = book?.volumeInfo?.description || 'Brak opisu';

    return (
    <div className="item book row" id={book?.id}>
        <div className="col-sm-2 d-flex justify-content-center">
            <img src={book?.volumeInfo?.imageLinks?.thumbnail || BookCoverPlaceholder} alt="Book cover placeholder" className='bookImg'/>
        </div>
        <div className="bookInfo col-sm-10">
            <h4>
                {book?.volumeInfo?.title}
                <Link to={`/book/${book?.id}`}><FaRegEdit/></Link>
            </h4>
            <h5 className='subtitle'>{book?.volumeInfo?.subtitle}</h5>
            <h5>{book?.voulumeInfo?.authors}</h5>
            <p>{book?.volumeInfo?.publisher}, {book?.volumeInfo?.publishedDate}</p>
            <br/>
            <div className='truncateLongTexts'>{desc.replace(htmlRegexG, '')}</div>
        </div>
    </div>
    )
}

export default Book;