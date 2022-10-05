import React from 'react'
import Form from 'react-bootstrap/Form';
import '../styles/signup.css'

function Signup() {
  return (
    <div>
      <div className="signup-main">

        <Form className='signup-form'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <div className="signup-name">
              <Form.Control type="text" placeholder="First name" />
              <Form.Control type="text" placeholder="Last name" />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="signup-name">
              <Form.Control type="password" placeholder="Password" />
              <Form.Control type="password" placeholder="Confirm Password" />
            </div>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else. Maybe.
            </Form.Text>
            <br />
            <Form.Text className="text-muted">
              Already have an account? <a href="./login" className='signup-loginbtn'>Login</a>
            </Form.Text>
          </Form.Group>
          <button className="signup-btn">Signup</button>
        </Form>
      </div>
    </div >
  )
}

export default Signup
