import {useState,useEffect, useRef} from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegWindowClose } from "react-icons/fa"
import Modal from 'react-bootstrap/Modal';
import Button from "./Button";

const Admin = () => {
  const [users, setUsers] = useState();
  const effectRun = useRef(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
    const [modalText, setModalText] = useState('')

  const deleteUser = async ( email) => {
    const controller = new AbortController();
     try {
        await axiosPrivate.post('/users/delete',
        {'email': email}, 
        {
          signal: controller.signal
        });

        const newUsersArray = users.filter(u => u.email !== email)
        setUsers(newUsersArray);
        setModalText('The user has been deleted')
        handleShow();
      } catch (err) {
        console.error(err)
        setModalText('Something went wrong')
        handleShow();
      }
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal
        });

        isMounted && setUsers(response.data)
      } catch (err) {
        console.error(err)
        navigate('/login', {state: {from: location}, replace: true})
      }
    }

    if (effectRun.current) {
      getUsers();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    }
  },[])

  return (
    <section>
      <h1>Users list</h1>
      {
        users?.length ?
        (
          <div className='list'>
            {
              users.map((user, index) => 
                <div 
                  className="item user" 
                  key={index}>
                    {user?.name}, {user?.email}
                    <FaRegWindowClose 
                      className="removeUserIcon"
                      onClick={(e) => deleteUser(user.email)}/>
                </div>)
            }
          </div>
        ) :
          <p>No users to display</p>
      }

      {/* modal */}
      <Modal show={showModal} onHide={handleClose}>
          <Modal.Body>{modalText}</Modal.Body>
          <Modal.Footer>
              <Button variant="primary" onClick={handleClose} text='ok, got it'/>
          </Modal.Footer>
      </Modal>
    </section>
  )
}

export default Admin;