import React, { useState } from 'react'
import test from './images/test.jpg'
import '../styles/profile.css'

function Profile() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contributions, setContributions] = useState([])



  return (
    <div>
      <div className='profile-main'>
        <div>
          <img className='profile-image' src={test} alt="" />
        </div>
        <div>

          <div className='profile-details'>
            <div>Akshay Yadav</div>
            <div>Email</div>
            <div>Contributions</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
