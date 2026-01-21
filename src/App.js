import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import CustomersPage from './pages/CustomersPage';

function App() {
  return (
    <Router>

      <Navbar />
      <main className="container pt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
