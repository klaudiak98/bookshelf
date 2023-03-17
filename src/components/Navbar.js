import { Link } from "react-router-dom"
import Logo from '../logo.svg'
import { useState } from "react"
import { Form } from "react-bootstrap"
import { FaUser } from "react-icons/fa"

const Navbar = () => {
    const [searchInput, setSearchInput] = useState('');
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

  return (
    <nav className="navbar">
        <Link to="/"><img src={Logo} alt="Logo" height="90px"/></Link>
        <Form.Control type="text" placeholder="Search book" value={searchInput} onChange={handleChange} style={{'width': '20em'}}/>
        <Link to={"/profile"}><FaUser color="black"/></Link>
    </nav>
  )
}

export default Navbar;