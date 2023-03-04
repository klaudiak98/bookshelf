import './App.css';
import { Route, Routes } from 'react-router';
import { Card } from 'react-bootstrap';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import Profile from './component/Profile';
import Settings from './component/Settings';
import NotFound from './component/NotFound';
import Navbar from './component/Navbar';

const App = () => {

  return (
    <>
      <Navbar/>

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
