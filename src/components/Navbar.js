import React from 'react';
import logo from '../images/logo.png';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Icon } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast, ToastContainer } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [status, setloginstatus] = useState('');
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [var1, setvar1] = useState('Home');
    const [var2, setvar2] = useState('Dashboard');
    const [var3, setvar3] = useState('Events');
    const role = localStorage.getItem('role');
    const [image,setImage]=useState('');

    useEffect(() => {
        if (role == 0) {
            setvar1('My Profile');
            setvar2('Contact');
            setvar3('My Events');
        } else if (role == 1) {
            setvar1('My Profile');
            setvar2('Dashboard');
            setvar3('Events');
        }
    }, [role]);

    const settings = [var1, var2, var3, status];
    const navigate = useNavigate();
    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
        if (setting === 'Login') {
            navigate('/login');
        } else if (setting === 'Logout') {
            handleLogout(); 
        } else if (setting === 'Dashboard') {
            navigate('/dashboard');
        }
        else if(setting==='My Profile')
        {
            if(status==='Logout')
            {
            navigate('/profile');
            }
            else{
                toast.error('Please login to view profile');
                
            }
        }
        else if(setting=="My Events")
        {
            if(status==='Logout')
            {
                navigate('/myevents');
            }
            else{
                toast.error('Please login to view events');
            }
        }
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    useEffect(() => {
        const email = localStorage.getItem('email');
        const name = localStorage.getItem('name');
        const image=localStorage.getItem('profileimage');
        if (email && email !== '') {
            setIsLoggedIn(true);
            setUserName(name);
            setImage(image);
            setloginstatus('Logout');
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setloginstatus('Login');
        window.location.href = '/login';
    };
    
    return (
        <div>
            <header className="App-header">
                <div className="logo-title">
                    <img src={logo} className="App-logo" alt="logo" onClick={() => navigate('/')} />
                    <p className="App-title" onClick={() => navigate('/')}>Student Sphere</p>
                </div>
                <div className="Half-header">
                    <input className='Search' type="text" placeholder='Search Here' />
                    <div className='links'>
                    <a href="/" className='Home-link'>Home</a>
                    <a href="/events" className='Event-link'>Events Page</a>
                    <a href="/clubs" className='Login-link'>Clubs</a>
                    {isLoggedIn ? (
                        <a href="#" onClick={handleLogout} className='Login-link'>Logout</a>
                    ) : (
                        <a href="/login" className='Login-link'>Login</a>
                    )}
                    <Box style={{ marginLeft: '20px' }} sx={{ flexGrow: 0 }}>
    <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        {/* <Avatar alt={userName} src="/static/images/avatar/2.jpg" /> */}
        <Avatar
    alt={userName || "Profile"} // Use the userName as the alt text or default to "Profile"
    src={image ? `data:image/jpeg;base64,${image}` : '/static/images/avatar/2.jpg'} // Show image if available, else use default avatar
>
    {/* If no image and userName is available, show the first letter of the userName */}
    {!image && userName ? userName.charAt(0).toUpperCase() : ''}
</Avatar>


        </IconButton>
    </Tooltip>
    <Menu
        sx={{
            mt: '45px',
            '& .MuiPaper-root': {
                backgroundColor: '#121212', // Dark background for the menu
                color: '#ffffff',           // Text color for menu items
                transition: 'background-color 0.3s ease',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            },
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
    >
        {settings.map((setting) => (
            <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}
                sx={{
                    '&:hover': {
                        backgroundColor: '#1968c2', // Hover effect
                        color: '#ffffff', // Text color on hover
                        transition: 'background-color 0.3s ease, transform 0.2s ease',
                        transform: 'scale(1.05)', // Slight zoom effect
                    },
                }}
            >
                <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
        ))}
    </Menu>
</Box>
                    </div>
                    
                </div>
            </header>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
    );
};
