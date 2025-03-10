import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KMLViewer from './components/KMLViewer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<KMLViewer />} />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
