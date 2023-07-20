import './App.css'
import Signup from './components/Auth/signup';
import PreNav from './components/NavUnsigned/PreNav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 

function App() {
  return (
    <>
      <PreNav />
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
