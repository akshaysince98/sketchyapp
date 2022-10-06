import React, { useState } from 'react'
import '../styles/login.css'

function Login() {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const loginclick = () => {
    // have to give specific errors for each missing field
    // through alerts is one option, need to see how it works, hassle free work
    // through html div box is another idea, will work but will need css adjustments, doable but hassle
    // better to also validate email right here and then send to the backend
    // need to check how exactly "npm emailvalidator" works
    // then i won't have to send cpass to backend
    if (!email) {
      return (alert('Email field cannot be empty!'))
    }
    if (!pass) {
      return (alert('Password field cannot be empty!'))
    }

    let newobj = {
      email,
      pass
    }

    console.log(newobj)
    // new obj is fine
    // just need to make a post request now
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
