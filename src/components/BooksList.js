import Book from "./Book";

const BooksList = ({books}) => {

    return (
        <div className="list">
            {books.map((book) => { return <Book key={book.id} book={book} />})}
        </div>
    )
}

export default BooksList;