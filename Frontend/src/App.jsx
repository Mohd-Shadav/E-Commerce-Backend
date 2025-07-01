import React from 'react';
import Sidebar from './Components/Sidebar';
// import TopBar from './Components/TopBar';
import { Box } from '@mui/material';
import './App.css'; // Import your CSS file for styling
import TopBar from './Components/TopBar';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
    <div className="main-container">
      <Sidebar  open={isSidebarOpen} setOpen={setIsSidebarOpen} />

      <div className="top-content-container">
      <TopBar  open={isSidebarOpen}
          title="Dashboard"
          mode="light"
          onToggleMode={() => {}}/>

        <div className="content-container">
          <Box sx={{ padding: 2 }}>
            <h1>Welcome to the E-Commerce Dashboard</h1>
            <p>This is your main content area.</p>
          </Box>
        </div>
      </div>
         </div>
    </>
  );
}

export default App;
