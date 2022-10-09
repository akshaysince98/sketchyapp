import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './components/context/authContext';
import Navigation from './components/Navigation';
import Home from './components/routes/Home';
import Login from './components/routes/Login';
import Main from './components/routes/Main';
import Pagenotfound from './components/routes/Pagenotfound';
import Profile from './components/routes/Profile';
import Signup from './components/routes/Signup';

function App() {

  return (
    <>

      <AuthProvider>

        <Navigation pathname={window.location.pathname} />
        <div className="App">

          <Routes>

            {/* seems like a good idea to add another route where everyone can see all the sketches; users can decide whether to make their sketch public or private */}
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/main' element={<Main />} />
            <Route path='/profile' element={< Profile />} />
            <Route path='/*' element={<Pagenotfound />} />
          </Routes>
        </div>
      </AuthProvider>

    </>
  );
}

export default App;
