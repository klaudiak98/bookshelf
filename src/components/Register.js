import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, FloatingLabel } from 'react-bootstrap';
import Button from "./Button";
import axios from '../api/axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const REGISTER_URL = "/register";
    
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatchPassword(match);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPassword]);

    const handleSubmit = async(e) =>  {
        e.preventDefault();
        try {
            const response = await axios.post(
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
            setEmail('');
            setPassword('');
            setMatchPassword('');
            setName('');
        } catch (err) { 
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg(`Account ${email} already exists`);
            } else {
                setErrMsg('Registration faild');
            }
        }
        setValidMatchPassword(false);
        setValidPassword(false);
    }

    return (
        <section className="form">
            <h1>Create new account</h1>
            <p className='errMsg'>{errMsg}</p>

             <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <FloatingLabel
                        label="email"
                        className="mb-3"
                        controlId="email"
                    >
                        <Form.Control 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                            placeholder="email"
                            value={email}
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="password"
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
                            value={name}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Button 
                    text='Register' 
                    type='submit'
                    disabled={!name || !validPassword || !validMatchPassword}
                />

             </Form>
            
            <Link to="/login"><p>or login</p></Link>
        </section>
    )}

export default Register;