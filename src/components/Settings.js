import { useState, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa"
import { Form, FloatingLabel } from 'react-bootstrap';
import Button from "./Button";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from "react-router-dom"
import useLogout from '../hooks/useLogout';
import ClipLoader from "react-spinners/ClipLoader";
import Modal from 'react-bootstrap/Modal';

const Settings = () => {

    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const logout = useLogout();

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [isSending, setIsSending] = useState(false);

    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const UPDATE_URL = "/users/update";

    const validPasswords = (PWD_REGEX.test(password) && (password === matchPassword));
    const wrongPassword = (password && !PWD_REGEX.test(password));
    const wrongMatchPasswords = (matchPassword && (password !== matchPassword))

    useEffect(()=> {
        const controller = new AbortController();
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get('/users/me', {
                signal: controller.signal
                });

                setUser(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        getUser()
    },[])

    const handleSubmit = async(e) =>  {
        const controller = new AbortController();
        e.preventDefault();
        setIsSending(true);

        const email = user.email;
        try {
            await axiosPrivate.patch(
                UPDATE_URL,
                JSON.stringify({
                    email,
                    password,
                    name
                }),
                {
                    signal: controller.signal
                }
            );

            setPassword('');
            setMatchPassword('');
            handleShow();

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {setErrMsg(err.message)}
        }
        setIsSending(false);
    }

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    return (
    <>
        <header className="header">
            <h1>Settings</h1>
            <div className="signOutButton">
                <button onClick={signOut}>
                    <FaRegWindowClose/>
                </button>
            </div>
        </header>
        <section className="cont">
            <p className='errMsg'>{errMsg}</p>
            { wrongPassword ?
                <p className='errMsg'>Password need to have 8 or more characters with a mix of letters numbers and symbols</p> : ''}
            { wrongMatchPasswords ?
                <p className='errMsg'>Passwords do not match</p> : ''}

            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <FloatingLabel
                        label="name"
                        className="mb-3"
                        controlId="name"
                    >
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => setName(e.target.value)}
                            placeholder="name"
                            value={name || ''}
                        />
                    </FloatingLabel>
                </Form.Group>

                <h5>Change password</h5>
                <Form.Group className="mb-3" controlId="formPassword">
                    <FloatingLabel
                        label="new password"
                        className="mb-3"
                        controlId="password"
                    >
                        <Form.Control
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="new password"
                            value={password}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMatchPassword">
                    <FloatingLabel
                        label="password again"
                        className="mb-3"
                        controlId="matchPassword"
                    >
                        <Form.Control
                            type="password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            required
                            placeholder="password again"
                            value={matchPassword}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Button
                    text='Save'
                    type='submit'
                    onClick={handleSubmit}
                    disabled={password && !validPasswords}
                />

                {isSending &&
                    <ClipLoader
                        color="#566270"
                        cssOverride={{
                            position: 'fixed',
                            top: '50vh',
                            left: '50vw'
                        }}
                        loading
                        aria-label="Loading Spinner"
                        size={75}
                        speedMultiplier={0.75}
                    />
                }
              </Form>
        </section>

        {/* modal */}
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Body>Your account has been updated</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose} text='ok, got it'/>
            </Modal.Footer>
        </Modal>
      </>
  )
}

export default Settings;