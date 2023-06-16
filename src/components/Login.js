import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, FloatingLabel } from 'react-bootstrap';
import Button from "./Button";
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
    const LOGIN_URL = "/auth";

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        setIsSending(true);

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({
                    email,
                    password,
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({email, password, roles, accessToken});
            setEmail('');
            setPassword('');
            setErrMsg('');
            navigate(from, {replace: true, state:{roles: roles}});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing email or password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login faild');
            }
        }
        setIsSending(false);
    }

    return (
        <>
            <section className="container">
                <h1>Login</h1>
                <p className='errMsg'>{errMsg}</p>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <FloatingLabel
                            controlId="email"
                            label="email"
                            className="mb-3"
                        >
                            <Form.Control 
                                type="email" 
                                placeholder="email"
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email} 
                                required
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <FloatingLabel
                            controlId="password"
                            label="password"
                            className="mb-3"
                        >
                            <Form.Control 
                                type="password" 
                                placeholder="password" 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                                required
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Button 
                        text='Login' 
                        type='submit'
                        disabled={!email || !password}
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

                <Link to="/register">or create new account!</Link>
            </section>
        </>
    )
}

export default Login;