import React, { useEffect, useState } from 'react'
import '../styles/signup.css'
import validator from 'email-validator'
import axios from 'axios'

function Signup() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [cpass, setCpass] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get('/user/notLoggedin')
      } catch (loggedin) {
        window.location.assign("/main")
        console.log('loggedin')
      }
    })()
  }, [loading])


  const signupclick = async () => {

    setLoading(true)


    // have to give specific errors for each missing field
    // through alerts is one option, need to see how it works, hassle free work
    // through html div box is another idea, will work but will need css adjustments, doable but hassle
    if (!name) {
      return (alert('First name field cannot be empty!'))
    }

    // better to also validate email right here and then send to the backend
    // need to check how exactly emailvalidator works
    if (!email) {
      return (alert('Email field cannot be empty!'))
    }

    if (!validator.validate(email)) {
      return (alert('Enter valid email!'))
    }

    if (!pass) {
      return (alert('Password field cannot be empty!'))
    }

    if (pass.length < 6) {
      return (alert('Password too short'))
    }

    if (!cpass) {
      return (alert('Confirm password field cannot be empty!'))
    }

    // now i won't have to send the cpass to backend
    if (cpass != pass) {
      return (alert('Passwords are not same!'))
    }

    let obj = {
      name,
      email,
      pass
    }

    // console.log(newobj)
    // new obj is fine
    // just need to make a post request now
    let response = await axios.post('/user/signup', obj)
    console.log(response)
    // setUser(response.data.data)

    setTimeout(() => {
      setLoading(false)
    }, 2000);
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
        {
          loading &&
          <div className='main-loading' >
            <div>Loading...</div>
          </div>
        }
      </div>
    </div >
  )
}

export default Signup
