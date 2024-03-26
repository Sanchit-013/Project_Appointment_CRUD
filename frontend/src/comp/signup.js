import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function Signup() {

    const regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
    const phoneRegex = /^[0-9]{10}$/

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()


    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/Home')
        }
    })




    const addUser = async () => {

        if (name.length === 0 || email.length === 0 || phone.length === 0 || password.length === 0) {
            alert("Please fill all the fields")
        }
        else if (!phone.match(phoneRegex) || phone.length < 10) {
            alert("Phone no. must be 10 digits long in NUMBERS only")
        } else if (!email.match(regex)) {
            alert("Invalid E-mail Format")
        } else if (password.length < 8 || password.length > 12) {
            alert("Password must be 8-12 digits long")
        } else {
            console.warn(name, email, phone, password);
            let result = await fetch('http://localhost:5000/', {
                method: 'post',
                body: JSON.stringify({ name, email, phone, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()
            console.warn(result);
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/Home')

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
                            <h1>SIGN UP</h1>
                            <p>If you Already have an Account <a href='/Login'>Login</a></p>
                            <p className='OR'>OR</p>
                            <p className='below'>Fill all the details below </p>
                            <div className='inp'>
                                <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>

                            <div className='inp'>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>

                            <div className='inp'>
                                <Form.Control type="text" placeholder="Enter Phone No." value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                            </div>

                            <div className='inp'>
                                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </div>

                            <button className='add' variant="primary" onClick={addUser}>
                                Sign-Up
                            </button>

                        </form>

                        <hr/>

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

export default Signup;