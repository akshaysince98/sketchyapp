import React from 'react'
import Form from 'react-bootstrap/Form';
import '../styles/login.css'

function Login() {
  return (
    <div>
      <div className="login-main">

        <Form className='login-form'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else. Maybe.
            </Form.Text>
            <br />
            <Form.Text className="text-muted">
              Don't have an account? <a href="./signup" className='login-signupbtn'>Signup</a>
            </Form.Text>
          </Form.Group>
          <button className="login-btn">Login</button>
        </Form>
      </div>
    </div >
  )
}

export default Login
