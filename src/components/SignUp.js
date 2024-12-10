// Login.js
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import './Login.css';
import logo from '../images/logo.png';
import ufo from '../images/uefo.png';
import axios from 'axios';
import Earth from './Earth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState(Array(6).fill(''));
    const [userData, setUserData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
    });

    useEffect(() => {
        // Show welcome text and scale Earth image after a delay
        const timer = setTimeout(() => {
            setVisible(true);
        }, 500); // Delay before showing text and scaling Earth

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    const handleSignup = () => {
        axios.post('https://springbootactivitymanagement-production.up.railway.app/addstudent', userData)
            .then(() => {
                toast.success('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            })
            .catch(err => {
                console.error(err);
                toast.error('Failed to create account. Please try again.');
            });
    };

    function fun2()
    {
        window.location.href='/login';
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const sendOtp = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    if (!emailRegex.test(userData.email)) {
        toast.error('Please enter a valid email!');
        return;
    }
        setIsVerifying(true);
        axios.post('https://springbootactivitymanagement-production.up.railway.app/send-otp', { email: userData.email })
            .then(response => {
                setOtp(response.data.otp); // Assume backend sends OTP in response
                setEmailSent(true);
                toast.success('OTP sent to your email!');
                setIsVerifying(false);
            })
            .catch((error) => {
                if (error.response && error.response.data.error) {
                    // Handle the case when the email already exists
                    toast.error(error.response.data.error); // Show error from backend (e.g., "Email already exists")
                  } else {
                    toast.error("Failed to send OTP. Please try again.");
                  }
            });
    };

    const verifyOtp = () => {
        if (enteredOtp.join('') !== otp) {
            toast.error('Invalid OTP!');
            return;
        }
        toast.success('Email verified successfully!');
        setEmailSent(false); // Allow signup after verification
    };

    const handleOtpChange = (value, index) => {
        if (!/^\d$/.test(value) && value !== '') return; // Allow only digits
        const updatedOtp = [...enteredOtp];
        updatedOtp[index] = value;
        setEnteredOtp(updatedOtp);

        // Move focus to the next input
        if (value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };
   
   
    return (
        <div>
            <div className='login-header'>
                <img src={logo} className="logo" alt="logo" onClick={() => navigate('/')}/>
                <p>Student Sphere</p>
                <div className='login-right'>
                    <a className='login-contact'><p>Contact</p></a>
                    <button onClick={fun2} className='signup'>Login</button>
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
                <span className='falling-word'>SignUp</span>
                     <span className='falling-word'>Here</span>
                        </p>
                    </div>

                    <div className='login-name'>
                    <div className='first-name-container'>
                            <input
                                className='name'
                                type='text'
                                name="firstname"
                                placeholder='First Name'
                                value={userData.firstname}
                                onChange={(e) =>
                                    setUserData({ ...userData, firstname: e.target.value })
                                }
                            />
                        </div>
                        <div className='last-name-container'>
                            <input
                                className='name1'
                                type='text'
                                name="lastname"
                                placeholder='Last Name'
                                value={userData.lastname}
                                onChange={(e) =>
                                    setUserData({ ...userData, lastname: e.target.value })
                                }
                            />
                        </div>
                </div> 
                <div className='login-email'> 
                                    <input
                            className='signup-email'
                            type='text'
                            name="email"
                            placeholder='Enter email'
                            value={userData.email}
                            onChange={(e) =>
                                setUserData({ ...userData, email: e.target.value })
                            }
                             />
                                    </div> 
                                    <div className='verify-email-container'>
                        <button className='verify-button' onClick={sendOtp} disabled={isVerifying}>
                            {isVerifying ? (
                                <span className="button-spinner">
                                    <span>Verifying</span>
                                    <span className="spinner"></span>
                                </span>
                            ) : (
                                'Verify Email'
                            )}
                        </button>
                    </div>

                    {emailSent && (
                        <div className='otp-container'>
                            {Array(6).fill(0).map((_, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    className='otp-box'
                                    type='text'
                                    maxLength={1}
                                    value={enteredOtp[index]}
                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                />
                            ))}
                            <button className='verify-otp-button' onClick={verifyOtp}>
                                Verify OTP
                            </button>
                        </div>
                    )}
                <div className='login-password'>
                                <input
                        className='signup-password'
                        type='password'
                        name="password"
                        placeholder='Enter password'
                        value={userData.password}
                        onChange={(e) =>
                            setUserData({ ...userData, password: e.target.value })
                        }
                                  />
                </div>   
                <button onClick={handleSignup} className='login-button' type='submit'>SignUp</button> 
                <div className='login-with-google'>

                    </div>
                <div className='login-signup'>
                    <a href='/login'>Alreadt have an account?Login Here</a>
                    </div>
            </div>
        </div>     
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}
