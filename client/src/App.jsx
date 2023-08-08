import './App.css'
import Signup from './components/Auth/signup';
// import PreNav from './components/NavUnsigned/PreNav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Hero from './components/Hero/Hero';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
