// Login.js
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import './Login.css';
import logo from '../images/logo.png';
import ufo from '../images/uefo.png';
import monkeyopen from '../images/monkey-eye-open.png';
import monkey from '../images/monkey.png';
import eyeopen from '../images/eye.png';
import eyeclose from '../images/eye-slash.png';
import axios from 'axios';
import Earth from './Earth'; // Import your Earth component
import { toast, ToastContainer } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        // Show welcome text and scale Earth image after a delay
        const timer = setTimeout(() => {
            setVisible(true);
        }, 500); // Delay before showing text and scaling Earth

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    const [passwordVisible, setPasswordVisible] = useState(false);

    function handleLogin() {
        axios.post("https://springbootactivitymanagement-production.up.railway.app/login", {
            email: document.getElementsByName('email')[0].value,
            password: document.getElementsByName('password')[0].value,
        }).then((res) => {
            console.log(res.data);
            if (res.data.role === 0 || res.data.role === 1) {
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('name', res.data.firstname || res.data.name);
                localStorage.setItem("profileimage", res.data.image);
                toast.success('Logged in Successfully!'); // Show success toast
                setTimeout(() => {
                    window.location.href = '/events';
                }, 1000);
            } else {
                toast.error('Invalid Credentials'); // Show error toast
            }
        }).catch((error) => {
            console.error("There was an error logging in!", error);
            toast.error('An error occurred, please try again'); // Handle unexpected errors
        });
    }
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    function redirectToSignup() {
        window.location.href = '/signup';
    }

    return (
        <div>
            <div className='login-header'>
                <img src={logo} className="logo" alt="logo" onClick={() => navigate('/')}/>
                <p>Student Sphere</p>
                <div className='login-right'>
                    <a className='login-contact'><p>Contact</p></a>
                    <button onClick={redirectToSignup} className='signup'>Sign Up</button>
                </div>
            </div>
            <div className='login-body'>
                <div className='login-body-left'>
                    <div className='login-body-left-top'>
                        <div className='welcome-container'>
                            <img src={ufo} className="uefo" alt="UFO" /> 
                            <p className={`welcome-text ${visible ? 'visible' : ''}`}>Welcome to Student Sphere</p> 
                        </div>
                        <div className='welcome-container-2'>
                        <p className={`welcome-text1 ${visible ? 'visible' : ''}`}>Find your Path Here</p> 
                                </div>
                        <div className='login-globe-container'>
                        <Canvas style={{ height: '350px', width: '350px', marginBottom: "150px" }} camera={{ position: [0, 0, 3], fov: 50 }} className='earth'>
                <ambientLight intensity={2.5} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                <directionalLight position={[-5, -5, -5]} intensity={1} />
                <OrbitControls />
                <Earth />
            </Canvas>

                        </div>
                    </div>
                </div>
                <div className='login-body-right'>
                    <div className='login-body-right-container'>
                        <div className='login-title'>
                        <p className='login-title'>
                <span className='falling-word'>Login</span>
                     <span className='falling-word'>Here</span>
                        </p>
                        </div>
                        <div className='login-monkey'>
                            <img src={passwordVisible ? monkey : monkeyopen} alt='monkey' className='monkey-image' />
                        </div>
                        <div className='login-email'>
                            <input className='email' type='text' name="email" placeholder='Enter email' />
                        </div>
                        <div className='login-password'>
                            <input
                                className='password'
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder='Enter password'
                                name="password"
                            />
                            <img
                                src={passwordVisible ? eyeclose : eyeopen}
                                alt='toggle password visibility'
                                className='eye-icon'
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        <div className='login-forgot'>
                            <a>Forgot Password?</a>
                        </div>
                        <button onClick={handleLogin} className='login-button' type='submit'>Login</button>
                        <div className='login-signup'>
                            <a href='/signup'>Don't have an account? Sign Up Here</a>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
    );
}
