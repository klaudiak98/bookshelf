import { useState } from "react";
import Book from "./Book";

const BooksList = () => {

    const [books, setBooks] = useState([
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
    <div className="bookList">
        {books.map((book) => { return <Book key={book.id} book={book}/>})}
    </div>
    )
}

export default BooksList;