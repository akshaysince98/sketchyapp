import axios from 'axios'
import React, { useEffect } from 'react'
import '../styles/home.css'

function Home() {

  useEffect(() => {
    (async () => {

      try {
        let response = await axios.get('/user/notLoggedin')
        console.log("notloggedin");
      } catch (loggedin) {
        console.log('loggedin')
        window.location.assign("/main")
      }
    })()


  }, [])


  return (
    <div>
      <div className='Home-welcometext'>
        Welcome to sketchyapp
      </div>
    </div>
  )
}

export default Home
