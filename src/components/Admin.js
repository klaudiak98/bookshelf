import {useState,useEffect, useRef} from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Admin = () => {
  const [users,setUsers] = useState();
  const effectRun = useRef(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
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
      getUser();
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
          <ul>
            {
              users.map((user, index) => <li key={index}>{user?.name}, {user?.email}</li>)
            }
          </ul>
        ) :
          <p>No users to display</p>
      }
    </section>
  )
}

export default Admin;