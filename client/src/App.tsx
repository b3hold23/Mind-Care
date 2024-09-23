import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import CreateProfile from './pages/create_profile';
import HomePage from './pages/home';
import ContactPage from './pages/contact';
import AboutPage from './pages/about';
import MySchedulePage from './pages/my_schedule';
import NewSchedulePage from './pages/new_schedule';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create_profile" element={<CreateProfile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/my_schedule" element={<MySchedulePage />} />
        <Route path="/new_schedule" element={<NewSchedulePage />} />
      </Routes>
    </Router>
  );
}

export default App;
