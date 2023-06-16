import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { FaCogs } from "react-icons/fa"
import axios from "axios"

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes?q=';

const Navbar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [books, setBooks] = useState([]);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    useEffect(()=> {
      let ignore = false;

      const getBook = async() => {
        const search = searchInput.replace(/\s+/g, '_')
        const response = await axios.get(`${GOOGLE_BOOKS_API}${search}`);
        if (!ignore) {
          setBooks(response.data?.items);
        }
      }

      searchInput.length ? getBook() : setBooks([]);

      return () => {
        ignore = true;
      };

    },[searchInput])

  return (
    <nav className="navbar">
        <Link to="/"><img src="logo.png" alt="logo" className="logo"/></Link>
        <div>
          <Form.Control type="text" placeholder="Search book" value={searchInput} onChange={handleChange} className="searchBar"/>
          <div className="searchBarList">
            {
              books?.map(book => {
                return(
                  <div className="box" key={book?.id}>
                    <Link to={`/book/${book?.id}`} onClick={()=>setSearchInput('')}>
                      <p className="title">{book?.volumeInfo?.title}</p>
                      {
                        book?.volumeInfo?.authors ?
                          <p className="author">{book?.volumeInfo?.authors}</p> :
                          ''
                      }
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Link to={"/settings"} aria-label='settings'><FaCogs className="settingsButton"/></Link>
    </nav>
  )
}

export default Navbar;