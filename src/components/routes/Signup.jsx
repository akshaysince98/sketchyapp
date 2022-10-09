import React, { useState } from 'react'
import '../styles/signup.css'

import { useAuth } from '../context/authContext'

function Signup() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [cpass, setCpass] = useState('')

  // might not be useful let's see
  // const [signupdata, setSignupdata] = useState({})

  const {signup } = useAuth()

  const signupclick = () =>{
    signup(name, email, pass, cpass)
  }

  return (
    <div>
      <div className="signup-main">
        <div className="signup-form">
          <div >Full Name</div>
          <div>
            <input type="text" placeholder="Enter full name" onChange={(e) => setName(e.target.value)} />
          </div>
          <br />
          <div>Email address</div>
          <div>
            <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <br />
          <div>Password</div>
          <div className="signup-name">
            <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
            <input type="password" placeholder="Confirm Password" onChange={(e) => setCpass(e.target.value)} />
          </div>
          <br />
          <span className='signup-endtext'>
            <div>We'll never share your email with anyone else. Maybe.</div>
            <span>Already have an account? </span>
          </span>
          <span><a href="./login" className='signup-loginbtn'>Login</a></span>
          <br />
          <br />
          <button className="signup-btn" onClick={signupclick} >Signup</button>
        </div>

      </div>
    </div >
  )
}

export default Signup
