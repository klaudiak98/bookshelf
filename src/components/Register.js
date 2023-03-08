import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FloatingLabel } from 'react-bootstrap';
import Button from "./Button";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [name, setName] = useState('');

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const handleRepasswordChange = (e) => {
        e.preventDefault();
        setRepassword(e.target.value);
    };

    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit = () =>  {
        console.log('email: ', email,' password: ',password, ' pass again: ', repassword, 'name: ', name)
    }

    return (
        <div className="form">
            <h1>Create new account</h1>

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

                <Form.Group className="mb-3" controlId="formPassword">
                    <FloatingLabel
                        controlId="floatingPasswordInput"
                        label="New password"
                        className="mb-3"
                    >
                        <Form.Control type="password" placeholder="password" onChange={handlePasswordChange}/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPasswordAgain">
                    <FloatingLabel
                        controlId="floatingPasswordAgainInput"
                        label="New password again"
                        className="mb-3"
                    >
                        <Form.Control type="password" placeholder="password again" onChange={handleRepasswordChange}/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                    <FloatingLabel
                        controlId="floatingNameInput"
                        label="Your name"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="name" onChange={handleNameChange}/>
                    </FloatingLabel>
                </Form.Group>

                <Button text='Register' type='submit'/>

             </Form>
            
            <Link to="/login"><p>or login</p></Link>
        </div>
    )
}

export default Register;