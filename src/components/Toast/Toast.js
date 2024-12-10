import React, { useEffect } from 'react';
import './toast.css'; // Import the CSS for styling

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Automatically close the toast after 5 seconds
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast ${type}`}>
            <div className="underline"></div>
            <div className="message">{message}</div>
        </div>
    );
};

export default Toast;
