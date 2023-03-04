import { Link } from "react-router-dom"
import '../style/Navbar.css'
import Logo from '../logo.svg'
import { useState } from "react"
import { Form } from "react-bootstrap"

const Navbar = () => {
    const [searchInput, setSearchInput] = useState('');
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

  return (
    <nav className="navbar">
        <Link to="/"><img src={Logo} alt="Logo" height="90px"/></Link>
        <Form.Control type="text" placeholder="Search book" value={searchInput} onChange={handleChange} id='searchBar'/>
        <Link to="/login">Login</Link>
    </nav>
  )
}

export default Navbar;