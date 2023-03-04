import { useOutletContext, useParams } from "react-router";

const Book = () => {
    const {id } = useParams()
    const obj = useOutletContext()
    return (
    <>
        <h1>Book {id}</h1>
        <p>{obj.hello}</p>
    </>
    )
}

export default Book;