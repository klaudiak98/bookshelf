// import { useOutletContext, useParams } from "react-router";
// import { FaPlus } from  'react-icons/fa'
import BookCoverPlaceholder from '../images/book-cover-placeholder.png';

const Book = ({book}) => {
    // const {id } = useParams()
    // const obj = useOutletContext()
    return (
    <div className="book d-flex">
        {/* <h1>Book {id}</h1> */}
        {/* <p>{obj.hello}</p> */}

        <div><img src={BookCoverPlaceholder} alt="Book cover placeholder"/></div>
        <div>
            <h3>{book.title}  </h3>
            <h4>{book.author}</h4>
        </div>

        {/* <FaPlus style={{color: 'green', cursor: 'pointer'}}/> */}
    </div>
    )
}

export default Book;