import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
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
      <div>

        <Navigation />
        <div className="App">
          <Routes>

            {/* <Route path='/signup' element={<RedirectToFeed>< Signup /></RedirectToFeed>} />
        <Route path='/feed' element={<PrivateRoute>< Feed /></PrivateRoute>} /> */}
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/main' element={<Main />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/*' element={< Pagenotfound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
