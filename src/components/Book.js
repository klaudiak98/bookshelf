// import { useOutletContext, useParams } from "react-router";
import { FaRegEdit } from  'react-icons/fa'
import BookCoverPlaceholder from '../images/book-cover-placeholder.png';

const Book = ({book}) => {
    // const {id } = useParams()
    // const obj = useOutletContext()

    const isLogged = true;

    return (
    <div className="book d-flex">
        {/* <h1>Book {id}</h1> */}
        {/* <p>{obj.hello}</p> */}

        <div><img src={BookCoverPlaceholder} alt="Book cover placeholder"/></div>
        <div>
            <h4 style={{fontWeight: "bold", display: "flex", justifyContent: "space-between"}}>{book.title} {isLogged ? <FaRegEdit/> : ''}</h4>
            <h5>{book.author}</h5>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero qui totam vitae voluptatibus quam quas rerum exercitationem ut, minima necessitatibus.</p>
        </div>

        {/* <FaPlus style={{color: 'green', cursor: 'pointer'}}/> */}
    </div>
    )
}

export default Book;