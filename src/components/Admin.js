import {useState,useEffect, useRef} from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegWindowClose } from "react-icons/fa"

const Admin = () => {
  const [users, setUsers] = useState();
  const effectRun = useRef(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const deleteUser = async ( email) => {
    const controller = new AbortController();
     try {
        const response = await axiosPrivate.post('/users/delete',
        {'email': email}, 
        {
          signal: controller.signal
        });

        const newUsersArray = users.filter(u => u.email !== email)
        setUsers(newUsersArray);
        alert('The user has been deleted');
      } catch (err) {
        console.error(err)
        alert('Something went wrong');
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
                  className="item d-flex justify-content-between align-items-center" 
                  key={index}>
                    {user?.name}, {user?.email}
                    <FaRegWindowClose 
                      style={{fontSize: '1.4em'}} 
                      color='red' 
                      onClick={(e) => deleteUser(user.email)}/>
                </div>)
            }
          </div>
        ) :
          <p>No users to display</p>
      }
    </section>
  )
}

export default Admin;