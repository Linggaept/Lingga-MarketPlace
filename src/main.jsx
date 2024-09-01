import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/Product.jsx'
import Login from './Pages/Login.jsx'
import DetailProduct from './Pages/DetailProduct.jsx'
import Notfound from './Pages/NotFound.jsx'
import Category from './Pages/Categories.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/product" element={<App />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
