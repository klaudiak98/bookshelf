import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FloatingLabel } from 'react-bootstrap';
import Button from "./Button";
import axios from '../api/axios';
import ClipLoader from "react-spinners/ClipLoader";
import Modal from 'react-bootstrap/Modal';

const Register = () => {
    const REGISTER_URL = "/register";
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const [ userInfo, setUserInfo ] = useState({
        email: '',
        name: '',
        password: '',
        matchPassword: ''
    });

    const [errMsg, setErrMsg] = useState('');
    const [isSending, setIsSending] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const validPasswords = (PWD_REGEX.test(userInfo.password) && (userInfo.password === userInfo.matchPassword));
    const wrongPassword = (userInfo.password && !PWD_REGEX.test(userInfo.password));
    const wrongMatchPasswords = (userInfo.matchPassword && (userInfo.password !== userInfo.matchPassword))

    const handleSubmit = async(e) =>  {
        e.preventDefault();
        setIsSending(true);
        try {
            const email = userInfo.email;
            const password = userInfo.password;
            const name = userInfo.name;

            await axios.post(
                REGISTER_URL,
                JSON.stringify({
                    email,
                    password,
                    name
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            setUserInfo({
                email: '',
                name: '',
                password: '',
                matchPassword: ''
            });

            handleShow();
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg(`Account ${userInfo.email} already exists`);
            } else {
                setErrMsg('Registration faild');
            }
        }
        setIsSending(false);
    }

    return (
        <section className="container">
            <h1>Create new account</h1>
            <p className='errMsg'>{errMsg}</p>
            { wrongPassword ?
                <p className='errMsg'>Password need to have 8 or more characters with a mix of letters numbers and symbols</p> : ''}
            { wrongMatchPasswords ?
                <p className='errMsg'>Passwords do not match</p> : ''}
                
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <FloatingLabel
                        label="email"
                        className="mb-3"
                        controlId="email"
                    >
                        <Form.Control className='form-focus'
                            type="email"
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value})}
                            required
                            placeholder="email"
                            value={userInfo.email}
                            autoComplete='username'
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <FloatingLabel
                        label="password"
                        className="mb-3"
                        controlId="password"
                    >
                        <Form.Control
                            type="password"
                            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value})}
                            required
                            placeholder="password"
                            value={userInfo.password}
                            autoComplete='new-password'
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
                            onChange={(e) => setUserInfo({ ...userInfo, matchPassword: e.target.value})}
                            required
                            placeholder="password again"
                            value={userInfo.matchPassword}
                            autoComplete='new-password'
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                    <FloatingLabel
                        label="name"
                        className="mb-3"
                        controlId="name"
                    >
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value})}
                            placeholder="name"
                            value={userInfo.name}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Button
                    text='Register'
                    type='submit'
                    disabled={isSending || !validPasswords || !userInfo.name || !userInfo.email}
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

            <Link to="/login">or login</Link>

            {/* modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Congratulations!</Modal.Title>
                </Modal.Header>
                <Modal.Body>New account has been created</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} text='ok, got it'/>
                </Modal.Footer>
            </Modal>

        </section>
    )}

export default Register;