import { Link } from "react-router-dom"
import Logo from '../logo.svg'
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
      const getBook = async() => {
        const search = searchInput.replace(/\s+/g, '_')
        const response = await axios.get(`${GOOGLE_BOOKS_API}${search}`);
        setBooks(response.data?.items);
      }

      searchInput.length ? getBook() : setBooks([]);
    },[searchInput])

  return (
    <nav className="navbar">
        <Link to="/"><img src={Logo} alt="Logo" height="90px"/></Link>
        <div>
          <Form.Control type="text" placeholder="Search book" value={searchInput} onChange={handleChange} style={{'width': '20em'}}/>
          <div className="searchBarList">
            {
              books?.map(book => {
                return(
                  <div className="box" key={book?.id}>
                    <Link to={`/book/${book?.id}`} style={{'color': 'black'}} onClick={()=>setSearchInput('')}>
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
        <Link to={"/settings"}><FaCogs color={"black"} size={'2em'} /></Link>
    </nav>
  )
}

export default Navbar;