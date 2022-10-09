import React, { useState } from 'react'
import './styles/navigation.css'


function Navigation(props) {
  let path = props.pathname
  console.log(path)

  return (
    <div className='navigation-parent'>
      <a href="./home" >N</a>

      <div className="navigation-actions">

        {
          path == '/main' ?
            <>
                <a href="./profile">Profile</a>
                <a href="./login">Logout</a>
            </>
            :
            path == '/profile' ?
              <>
                <a href="./main">Canvas</a>
                <a href="./login">Logout</a>
              </>
              :
              path == '/signup' ?
                <>
                  <a href="./home" >Home</a>

                </>
                :
                path == '/login' ?
                  <>
                    <a href="./home" >Home</a>

                  </>
                  :
                  path == '/home' || path == '/' ?
                    <>
                      <a href="./signup" >Signup</a>
                      <a href="./login" >Login</a>
                    </>
                    :
                    <>
                      <a href="./home" >Home</a>
                    </>
        }

      </div>
    </div >
  )
}

export default Navigation
