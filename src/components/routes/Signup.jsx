import React, { useState } from 'react'
import '../styles/signup.css'

function Signup() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [cpass, setCpass] = useState('')

  // might not be useful let's see
  const [signupdata, setSignupdata] = useState({})

  const signupclick = () => {
    // have to give specific errors for each missing field
    // through alerts is one option, need to see how it works, hassle free work
    // through html div box is another idea, will work but will need css adjustments, doable but hassle
    if (!firstName) {
      return (alert('First name field cannot be empty!'))
    }

    // lastname might not be a necessary field, will see about it later
    // if (!lastName) {
    //   return
    // }

    // better to also validate email right here and then send to the backend
    // need to check how exactly emailvalidator works
    if (!email) {
      return (alert('Email field cannot be empty!'))
    }
    if (!pass) {
      return (alert('Password field cannot be empty!'))
    }
    
    if (!cpass) {
      return (alert('Confirm password field cannot be empty!'))
    }
    
    // now i won't have to send the cpass to backend
    if (cpass != pass) {
      return (alert('Passwords are not same!'))
    }

    let newobj = {
      firstName,
      lastName,
      email,
      pass
    }

    console.log(newobj)
    // new obj is fine
    // just need to make a post request now

  }

  return (
    <div>
      <div className="signup-main">
        <div className="signup-form">
          <div >Name</div>
          <div className="signup-name">
            <input type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
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
