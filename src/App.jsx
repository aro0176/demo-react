import React from 'react'
import Home from './components/Home'
import Classification from './components/Classification'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/class' element={<Classification />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App