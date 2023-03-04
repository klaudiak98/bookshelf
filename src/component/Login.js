import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FloatingLabel } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const handleSubmit = () =>  {
        console.log('email: ', email,' password: ',password)
    }

    return (
        <div className="d-flex flex-column">
            <h1 className="align-self-center">Login</h1>

             <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <FloatingLabel
                        controlId="floatingEmailInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" onChange={handleEmailChange}/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel
                        controlId="floatingPasswordInput"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control type="password" placeholder="password" onChange={handlePasswordChange}/>
                    </FloatingLabel>
                </Form.Group>

                <Button variant="success" type="submit">
                    Submit
                </Button>

             </Form>
            
            <Link to="/register"><p>or create new account!</p></Link>
        </div>
    )
}

export default Login;