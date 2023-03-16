import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, FloatingLabel } from 'react-bootstrap';
import Button from "./Button";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    },[email, password])

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        console.log('email: ', email,' password: ',password)
        setEmail('');
        setPassword('');
        setSuccess(true);
    }

    return (
        <>
        {
            success ? 
            (
                <section>
                    <Link to="/"> go to home</Link>
                </section>
            ) : (
                <section className="form">
                    <h1>Login</h1>
                    <p className={errMsg}>{errMsg}</p>

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
                    </Form>

                    <Link to="/register"><p>or create new account!</p></Link>
                </section>
            )}
        </>
    )
}

export default Login;