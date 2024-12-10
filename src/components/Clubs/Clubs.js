import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Clubs.css';

const Clubs = () => {
    const [clubsData, setClubsData] = useState([]); 

    useEffect(() => {
        axios.get('https://springbootactivitymanagement-production.up.railway.app/viewclubs')
            .then((response) => setClubsData(response.data))
            .catch((error) => console.log("Error fetching clubs:", error));
    }, []);

    return (
        <div>
            <div className="Clubs">
                <div className="Clubs-header">
                    <div className="Clubs-title"><p>All Clubs</p></div>
                    <p>Explore Our Clubs!</p>
                </div>
                <div className="Clubs-body">
                    {clubsData.map((club, index) => (
                        <div 
                            className="Clubs-card" 
                            key={index} 
                            style={{ animationDelay: `${index * 0.2}s` }} // Added dynamic delay
                        >
                            <div className="Clubs-image">
                                <img className="Clubs-image-container" src={`data:image/jpeg;base64,${club.image}`} alt={club.clubName} />
                            </div>
                            <div className="Clubs-description">
                                <div className="Club-name">
                                    <p>{club.clubName}</p>
                                </div>
                                <div className="Club-coordinator">
                                    <p>Coordinator: {club.coordinatorName}</p>
                                </div>
                                <div className="Club-description-body">
                                    <p>{club.description}</p>
                                </div>
                            </div>
                            <button className="view-club-button">View Club</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clubs;
