import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';


function Login() {

    const regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/


    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/Home')
        }
    })

    const userLogin = async () => {

        if (email.length === 0 || password.length === 0) {
            alert("Email and Password cannot be blank")
        } else if (!email.match(regex)) {
            alert("Invail E-mail")
        } else if (password.length < 8) {
            alert(`Invalid Password, it must contain 8-12 digits`)
        } else {

            console.warn(email, password);
            let result = await fetch('http://localhost:5000/Login', {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()
            console.warn(result);
            if (result.name) {
                localStorage.setItem("user", JSON.stringify(result));
                navigate('/Home');
            } else {
                alert(`Not Found Password OR Email`)
            }
        }

    }



    const handle = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <div className='signup'>
                <div className='main'>
                    <div className='container'>
                        <form onSubmit={handle}>
                            <h1 className='LogIn'>LOG IN</h1>
                            <p className='sign'>If you don't have an Account <a href='/'>Sign-Up</a></p>
                            <p className='icon'>Login to your Account via <img className='google' src={require('./img/googl.png')} /></p>
                            <span className='OR'>OR</span>
                            <p className='using'>Login to your account using</p>

                            <div className='inp'>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>

                            <div className='inp'>
                                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </div>

                            <button className='logs' variant="primary" onClick={userLogin}>
                                Log-In
                            </button>
                        </form>
                        <hr />

                        <div className='googleAuth'>
                            
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;