import { useState, useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import UserContext from "../UserContext";


export default function Login() {

const { user, setUser } = useContext(UserContext);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const [isActive, setIsActive] = useState(false);

console.log(email);
console.log(password);

useEffect(() => {   

    if(email !== '' && password !== ''){
        setIsActive(true);
    }else{
        setIsActive(false);
    }

}, [email, password]);

function authenticate(e) {

    e.preventDefault();

    fetch(`${process.env.REACT_APP_ECOMMERCE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.access);
        if (typeof data.access !== "undefined") {
            localStorage.setItem("token", data.access);
            retrieveUserDetails(data.access);

            Swal.fire({
                title: "Login Successful",
                icon: "success",
                text: "Welcome to Fashion Shop!"
            });
        }
        else{
            Swal.fire({
                title: "Authentication Failed!",
                icon: "error",
                text: "Check your login details and try again."
            });
        }
    });

    setEmail('');
    setPassword('');

}

const retrieveUserDetails = (token) => {


    fetch(`${process.env.REACT_APP_ECOMMERCE_URL}/users/:userId/details`, {
        method: "GET",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        setUser({
            id: data._id,
            isAdmin: data.isAdmin
        });
    })
}

return (
    (user.id !== null)
    ?
        <Navigate to="/products" />
    :

    (user.isAdmin === true)
    ?
        <Navigate to="/adminDashboard" />

    :
    <>
        <h1 className="my-5 text-center">Login</h1>
        <Form onSubmit={(e) => authenticate(e)}>
            <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            {
            isActive
            ?
                <Button variant="primary" type="submit" id="submitBtn">
                    Login
                </Button>
            :
                <Button variant="danger" type="submit" id="submitBtn" disabled>
                    Login
                </Button>
            }
        </Form>
    </>
)
}
