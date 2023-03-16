import './App.css';
import { Route, Routes } from 'react-router';
import { Card } from 'react-bootstrap';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Settings from './components/Settings';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';

const App = () => {

  const isLogged = false;

  return (
    <>
      <Navbar isLogged={isLogged}/>

      <Card body className='mx-5 bg-light'>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/settings" element={<Settings/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </Card>
    </>
  );
}

export default App;
