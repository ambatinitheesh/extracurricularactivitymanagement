import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './myevents.css'; // Assuming the same CSS file is reused

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const studentEmail = localStorage.getItem('email');

    useEffect(() => {
        if (studentEmail) {
            axios
                .get('https://springbootactivitymanagement-production.up.railway.app/registered-events', {
                    params: { email: studentEmail },
                })
                .then((response) => {
                    setEvents(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching registered events:', error);
                });
        }
    }, [studentEmail]);

    const viewEvent = (event) => {
        navigate(`/events/${event.eventName}`);
    };

    if (!studentEmail) {
        return <p>Please log in to view your registered events.</p>;
    }

    if (events.length === 0) {
        return <p>No events registered yet.</p>;
    }

    return (
        <div className='Events'>
            <div className='Events-header'>
                <div className='Events-title'>
                    <p>My Registered Events</p>
                </div>
            </div>
            <div className='Events-body'>
                {events.map((event, index) => (
                    <div className="Events-card" key={index}>
                        <div className="Events-image">
                            <img
                                className='Events-image-container'
                                src={`data:image/jpeg;base64,${event.image}`}
                                alt="Event"
                            />
                        </div>
                        <div className="Events-description">
                            <div className="Event-title">
                                <p>{event.eventName}</p>
                            </div>
                            <div className="Event-club">
                                <p>Organized by: {event.club?.clubName}</p>
                            </div>
                            <div className='Event-description-body'>
                                <p>{event.description}</p>
                            </div>
                        </div>
                        <button onClick={() => viewEvent(event)} className='know-more'>
                            Know More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEvents;
