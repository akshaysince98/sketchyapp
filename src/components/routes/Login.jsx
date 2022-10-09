import axios from 'axios'
import React, { useState } from 'react'
import '../styles/login.css'

function Login() {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const loginclick = async() => {
    if (!email) {
      return (alert('Email field cannot be empty!'))
    }
    if (!pass) {
      return (alert('Password field cannot be empty!'))
    }

    let obj = {
      email,
      pass
    }

    let response = await axios.post('/user/login', obj)
    console.log(response.data.data)
    // setUser(response.data.data)
  }

  return (
    <div>
      <div className="login-main">
        <div className="login-form">
          <div>Email address</div>
          <div>
            <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <br />
          <div>Password</div>
          <div className="signup-name">
            <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
          </div>
          <br />
          <span className='login-endtext'>
            <div>We'll never share your email with anyone else. Maybe.</div>
            <span>Don't have an account? </span>
          </span>
          <span><a href="./signup" className='login-signupbtn'>Signup</a></span>
          <br />
          <br />
          <button className="login-btn" onClick={loginclick} >Login</button>
        </div>
      </div>
    </div >
  )
}

export default Login
