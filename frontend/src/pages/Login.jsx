import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css'

import loginimg from '../assets/all-images/login.jpg.jpg'
import userIcon from '../assets/all-images/user-icon-jpg.jpg'

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {

    const [credentials, setCredentaials] = useState({
        // userId: "01",
        // userEmail:"example@gmail.com",
        // firstname: "",
        // lastname: "", 
        email:undefined,
        password:undefined,

    });

    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = e => {
        setCredentaials(prev => ({ ...prev, [e.target.id]: e.target.value }));

    };

    const handleClick = async e => {
        e.preventDefault();

        dispatch({type:'LOGIN_START'})

        try {
            
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method:'post',
                    headers:{
                        'content-type':'application/json',
                    },
                    credentials:'include',
                    body: JSON.stringify(credentials),

            })

            const result = await res.json()
            if(!res.ok) alert(result.message)

            console.log(result.data);

            dispatch({type: 'LOGIN_SUCCESS', payload: result.data})
            navigate("/")

        } catch (err) {
            dispatch({type:'LOGIN_FAILURE', payload:err.message})
            
        }

    }

return (
    <section>
        <Container>
            <Row>
                <Col lg='8' className="m-auto">
                    <div className="login__container d-flex justfuy-content-between">
                        <div className="login__img">
                            <img src={loginimg} alt="" />
                        </div>

                        <div className="login__form">
                            <div className="user">
                                <img src={userIcon} alt="" />
                            </div>

                            <h2>Login</h2>

                            <Form onSubmit={handleClick}>
                                <FormGroup>
                                    <input
                                    type="email" 
                                    placeholder="Email" 
                                    required 
                                    id="email" 
                                    onChange={handleChange} 
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <input 
                                    type="password" 
                                    placeholder="password" 
                                    required id="password" 
                                    onChange={handleChange} 
                                    />
                                </FormGroup>
                                <Button className="btn secondary__btn auth__btn"
                                    type="submit">Login</Button>
                            </Form>
                            <p>Don't have an account? <Link to='/register'>Create</Link> </p>
                        </div>

                    </div>
                </Col>
            </Row>
        </Container>
    </section>
);
};
export default Login;