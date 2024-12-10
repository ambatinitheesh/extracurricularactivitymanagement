import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import { FaPencilAlt } from 'react-icons/fa';

function Profile() {
    const [result, setResult] = useState(null);

    useEffect(() => {
        axios
            .get('https://springbootactivitymanagement-production.up.railway.app/profile', {
                params: { email: localStorage.getItem('email') },
            })
            .then((response) => {
                setResult(response.data);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });
    }, []);

    return (
        <div className="profile-container">
            {result ? (
                <div className="avatar-banner">
                    {/* Top right Edit Profile button */}
                    <button className="edit-profile-btn">
                        Edit Profile
                    </button>

                    {/* Avatar and Details Section */}
                    <div className="avatar-details">
                        {/* Profile Avatar */}
                        <div className="avatar-container">
                            <div className="avatar">
                                {result.image ? (
                                    <img
                                        src={`data:image/jpeg;base64,${result.image}`}
                                        alt="Profile"
                                        className="avatar-img"
                                    />
                                ) : (
                                    result.role === 0
                                        ? `${result.firstname[0]}${result.lastname[0]}`
                                        : result.name[0]
                                )}
                            </div>
                            <a href="#" className="edit-profile-image-link">
                                <FaPencilAlt className="edit-icon" /> Edit Profile Image
                            </a>
                        </div>

                        {/* Profile Details */}
                        <div className="details-container">
                            <h1 className="name">
                                {result.role === 0
                                    ? `${result.firstname} ${result.lastname}`
                                    : result.name}
                            </h1>
                            <p className="emailclass"><strong>Email:</strong> {result.email}</p>
                            <p className="role"><strong>Role:</strong> {result.role === 0 ? 'Student' : 'Admin'}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}

export default Profile;
