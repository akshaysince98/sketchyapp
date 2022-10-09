import React, { useContext, useEffect, useState } from "react";
import validator from 'email-validator'
import axios from 'axios'

const authContext = React.createContext();

export const AuthProvider = ({ children }) => {

  // states, hooks
  const x = {
    contributions: [],
    email: "ankur@gmail.com",
    name: "ankur",
    pass: "123456",
    __v: 0,
    _id: "63428fe45f7e632c84a0b807"
  }
  // const [user, setUser] = useState(x)
  const [user, setUser] = useState(null)

  // functions

  // useEffect(() => {
  //   let userdata = localStorage.getItem("user");
  //   userdata = JSON.parse(userdata)
  //   if (!userdata) {
  //     return
  //   }
  //   setUser(userdata)

  // }, [])
  // console.log(user)


  const signup = async (name, email, pass, cpass) => {
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
    setUser(response.data.data)
    let res = JSON.stringify(response.data.data)

    localStorage.setItem("user", res)

  }

  const login = async (email, pass) => {
    if (!email) {
      return (alert('Email field cannot be empty!'))
    }
    if (!pass) {
      return (alert('Password field cannot be empty!'))
    }

    let obj = {
      email,
      pass
    }

    console.log(obj)

    let response = await axios.post('/user/login', obj)
    console.log(response)
    setUser(response.data.data)

    let res = JSON.stringify(response.data.data)

    localStorage.setItem("user", res)

  }


  return (
    <authContext.Provider value={{
      user,
      signup,
      login
    }
    }>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)