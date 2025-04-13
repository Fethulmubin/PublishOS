import React, { useState } from 'react';
import './NavBottom.css';
import AddIcon from '@mui/icons-material/Add';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NavBottom = ({showForm, setShowForm}) => {
    const [activeTab, setActiveTab] = useState('home');

  return (
    <nav className="bottom-nav">
      <div 
        className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => setActiveTab('search')}
      >
        <MessageIcon style={{ color: '#74a1e8', fontSize: '25px' }}/>
        <span className="nav-text">Message</span>
      </div>
      <div 
        className={`nav-item ${activeTab === 'network' ? 'active' : ''}`}
        onClick={() => setShowForm(!showForm)}
      >
        <AddIcon style={{ color: '#74a1e8', fontSize: '30px' }}/>
        <span className="nav-text">post</span>
      </div>
      <div 
        className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
        onClick={() => setActiveTab('jobs')}
      >
        <NotificationsIcon style={{ color: '#74a1e8', fontSize: '25px' }}/>
        <span className="nav-text">Notification</span>
      </div>
    </nav>
  );
};

export default NavBottom;