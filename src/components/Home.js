import { useState } from "react";
import BooksList from "./BooksList";
import Button from "./Button";

const Home = () => {

    const [randomBooks, setRandomBooks] = useState([
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
        <>
            <h1>Check this books</h1>
            <BooksList books={randomBooks}/>
            <Button text={"Show me more!"} style={{width: "fit-content"}}/>
        </>
    )
}

export default Home;