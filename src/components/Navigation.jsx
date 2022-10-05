import React from 'react'
import './styles/navigation.css'


function Navigation() {
  return (
    <div className='navigation-parent'>
      <a href="./home" >N</a>

      <div className="navigation-actions">
        <a href="./profile">Profile</a>
        <a href="./login">Logout</a>

      </div>
    </div>
  )
}

export default Navigation
