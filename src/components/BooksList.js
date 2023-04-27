import Book from "./Book";

const BooksList = ({booksId}) => {

    return (
        <div className="list">
            {booksId?.map((bookId) => { return <Book key={bookId} bookId={bookId} />})}
        </div> 
    )
}

export default BooksList;