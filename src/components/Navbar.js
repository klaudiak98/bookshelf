import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { FaCogs } from "react-icons/fa"
import axios from "axios"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar as NavbarBootstrap} from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes?q=';

const Navbar = () => {
    const { auth } = useAuth();

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
    <NavbarBootstrap expand="lg">
      <Container>
        <NavbarBootstrap.Brand href="/">
          <img src="logo.png" alt="logo" className="logo"/>
        </NavbarBootstrap.Brand>
        <NavbarBootstrap.Toggle aria-controls="navbar-nav" className="toggleButton"/>
        <NavbarBootstrap.Collapse id="navbar-nav" className="flex-grow-0">
          <Nav className="mt-2 me-auto">
            <Form.Control type="text" placeholder="Search book" value={searchInput} onChange={handleChange} className="searchBar" id="searchBar"/>
            <div
              className="searchBarList"
              style={{top:
                document.getElementById('searchBar')?.getBoundingClientRect()?.top +
                document.getElementById('searchBar')?.getBoundingClientRect()?.height/2 || '0'
                }}

              >
              {
                books?.map(book=> {
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
            {auth.accessToken ? <Nav.Link href="/settings" aria-label='settings'><FaCogs className="settingsButton"/></Nav.Link> : ''}

          </Nav>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  )
}

export default Navbar;