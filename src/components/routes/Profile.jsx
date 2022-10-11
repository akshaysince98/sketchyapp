import React, { useEffect, useState } from 'react'
import test from './images/test.jpg'
import '../styles/profile.css'
import axios from 'axios'

function Profile() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contributions, setContributions] = useState([])

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get('/user/notLoggedin')
        console.log(response.data.message);
        window.location.assign("/login")
      } catch (loggedin) {
        console.log('loggedin')
      }

      let user = await axios.get("/user/getUser")
      setName(user.data.name)
      setEmail(user.data.email)
      let narr = user.data.contributions.map((c, i) => {
        return c.sketchName
      })
      setContributions(narr)
    })()
  }, [])

  return (
    <div>
      <div className='profile-main'>
        <div>
          <img className='profile-image' src={test} alt="" />
        </div>
        <div>

          <div className='profile-details'>
            <div>{name}</div>
            <div>{email}</div>
            <div>Contributions:</div>
            {contributions.map((c, i) => {
              return <div key={i} >{c}</div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
