import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/navigation.css'


function Navigation(props) {

  const [name, setName] = useState('')

  useEffect(() => {

    (async () => {
      let user = await axios.get("/user/getUser")
      if (user.data.name) {
        setName(user.data.name)
      }
    })()

  }, [])

  const loggingout = async () => {
    await axios.get('/user/logout')
  }
  let path = props.pathname

  return (
    <div className='navigation-parent'>
      <a href="./home" >N</a>

      <div className="navigation-actions">

        {
          path == '/main' ?
            <>
              <a href="./profile">{name.split(' ')[0]}</a>
              <a onClick={loggingout} href="./home">Logout</a>
            </>
            :
            path == '/profile' ?
              <>
                <a href="./main">Canvas</a>
                <a onClick={loggingout} href="./home" >Logout</a>
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
