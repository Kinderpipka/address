import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddressList from './AddressList';
import AddressSearch from './pages/profile/AddressComponent';
import Auth from './pages/login/AuthComponent';

const App = () => {
  const [token, setToken] = useState('');

  return (
      <Router>
          <Routes>
              <Route path="/login" element={<Auth setToken={setToken} />} />
              <Route path="/search" element={<AddressSearch token={token} />} />
              <Route path="/addresses" element={<AddressList token={token} />} />
          </Routes>
      </Router>
  );
};

export default App;
