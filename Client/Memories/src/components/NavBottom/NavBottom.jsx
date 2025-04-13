import React, { useState } from 'react';
import './NavBottom.css';

const NavBottom = ({showForm, setShowForm}) => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <nav className="bottom-nav">
      <div 
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={()=> setShowForm(prev => !prev)}
      >
        <i className="nav-icon">🏠</i>
        <span  className="nav-text">Home</span>
      </div>
      <div 
        className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => setActiveTab('search')}
      >
        <i className="nav-icon">🔍</i>
        <span className="nav-text">Search</span>
      </div>
      <div 
        className={`nav-item ${activeTab === 'network' ? 'active' : ''}`}
        onClick={() => setActiveTab('network')}
      >
        <i className="nav-icon">👥</i>
        <span className="nav-text">Network</span>
      </div>
      <div 
        className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
        onClick={() => setActiveTab('jobs')}
      >
        <i className="nav-icon">💼</i>
        <span className="nav-text">Jobs</span>
      </div>
      <div 
        className={`nav-item ${activeTab === 'messaging' ? 'active' : ''}`}
        onClick={() => setActiveTab('messaging')}
      >
        <i className="nav-icon">✉️</i>
        <span className="nav-text">Messaging</span>
      </div>
    </nav>
  );
};

export default NavBottom;