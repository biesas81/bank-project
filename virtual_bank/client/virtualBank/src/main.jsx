import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import NewAccount from './pages/NewAccount.jsx';
import TopUp from './pages/TopUp.jsx';
import Reduce from './pages/Reduce.jsx';
import Header from './components/Header.jsx';

createRoot(document.getElementById('root')).render(


  <BrowserRouter>
    <Header />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-account" element={<NewAccount />} />
        <Route path="/topup/:id" element={<TopUp />} />
        <Route path="/reduce/:id" element={<Reduce />} />
        <Route path="*" element={<h1>Toks puslapis nerastas</h1>} />
      </Routes>
    </div>
  </BrowserRouter>
)

// CRUD
// CREATE 
// READ
// UPDATE
// DELETE