import React from 'react'
import logo from '../logo.svg';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
export const Navbar = () => {
  return (
    <div>
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Student Sphere
        </p>
        <div className="Half-header">
        <input className='Search' type="text" placeholder='Search'/>
        <a href="/" className='Home-link'>Home</a>
          <a href="/events" className='Event-link'>Events Page</a>
          <a href="/clubs" className='Login-link'>Clubs</a>
          <a href="/login" className='Login-link'>Login</a>  
        <Badge className='badge' badgeContent={4} color="primary">
        <MailIcon color="white" />
        </Badge>
        </div>
        
      </header>
    </div>
  )
}
