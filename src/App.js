import './App.css';
import { Route, Routes } from 'react-router';
import { Card } from 'react-bootstrap';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Admin from './components/Admin';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import BookPage from './components/BookPage';

const App = () => {
  document.title = 'MasterThesisReact';

  const ROLES = {
    "User": 100,
    "Admin":777
  }

  return (
    <>
      <Navbar/>

      <Card body className='mx-5 bg-light'>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>

          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
              <Route path="/settings" element={<Settings/>}></Route>
              <Route path="/book/:bookId" element={<BookPage/>}></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
              <Route path="/admin" element={<Admin/>}></Route>
            </Route>
          </Route>

          <Route path='*' element={<NotFound/>}></Route>

        </Routes>
      </Card>
    </>
  );
}

export default App;
