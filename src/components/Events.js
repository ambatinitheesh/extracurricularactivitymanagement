import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/events.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [newEvent, setNewEvent] = useState({
        eventName: '',
        coordinatorName: '',
        date: '',
        time: '',
        capacity: '',
        venue: '',
        description: '',
        category: '',
        clubName: '', 
        image: null,
    });
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://springbootactivitymanagement-production.up.railway.app/events')
            .then((response) => setEvents(response.data))
            .catch((error) => console.log("Error fetching events:", error));

        // Fetch clubs for the dropdown
        axios.get('https://springbootactivitymanagement-production.up.railway.app/names')
            .then((response) => setClubs(response.data))
            .catch((error) => console.log("Error fetching clubs:", error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setNewEvent((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleAddEvent = () => {
        setShowOverlay(true);
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    };

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newEvent).forEach((key) => {
            formData.append(key, newEvent[key]);
        });

        axios.post('https://springbootactivitymanagement-production.up.railway.app/addevent', formData)
        .then((response) => {
            setEvents([...events, response.data]);
            setShowOverlay(false);
            toast.success('Event added successfully!', {
                position: 'top-right',
            });
        })
        .catch((error) => {
            console.error("Error adding event:", error);
            toast.error('Error adding event. Please try again.', {
                position: 'top-right',
            });
        });
    };

    const handleDeleteEvent = () => {
        axios.delete(`https://springbootactivitymanagement-production.up.railway.app/delete-event`,{
            params: {
                eventName: eventToDelete,
            },
        })
            .then(() => {
                setShowDeleteConfirmation(false);
                toast.success('Event deleted successfully!', {
                    position:'top-right', 
                });
                setEvents(prevEvents => prevEvents.filter(event => event.eventName !== eventToDelete));
            })
            .catch(error => {
                console.error("Error deleting event:", error);
                toast.error('Error deleting event. Please try again.', {
                    position: 'top-right',
                });
            });
    };

    const handleShowDeleteConfirmation = (eventName) => {
        setEventToDelete(eventName);
        setShowDeleteConfirmation(true);
    };

    const viewEvent = (event) => {
        navigate(`/events/${event.eventName}`);
    };

    return (
        <div className='Events'>
             <ToastContainer />
            <div className='Events-header'>
                <div className='Events-title'><p>All Events</p></div>
                {role === '1' && (
                    <button onClick={handleAddEvent} className='add-edit-btn'>Add Event</button>
                )}
            </div>
            <div className='Events-body'>
                {events.map((event, index) => (
                    <div className="Events-card" key={index}>
                        {/* Three Dots Menu */}
                        {role === '1' && (
                            <div className="three-dots">
                                
                                <button className="dots-button">...</button>
                                <div className="dropdown-menu">
                                    <button onClick={() => viewEvent(event)} className="dropdown-item">Edit Event</button>
                                    <button onClick={() => handleShowDeleteConfirmation(event.eventName)} className="dropdown-item">Delete Event</button>
                                </div>
                            </div>
                        )}

                        {/* Event Image */}
                        <div className="Events-image">
                            <img className='Events-image-container' src={`data:image/jpeg;base64,${event.image}`} alt="Event" />
                        </div>

                        {/* Event Description */}
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
                        <button onClick={() => viewEvent(event)} className='know-more'>Know More</button>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation */}
            {showDeleteConfirmation && (
                <div className="confirmation-overlay">
                    <div className="confirmation-content">
                        <p>Are you sure you want to delete this event?</p>
                        <button onClick={handleDeleteEvent} className="confirm-button">Yes</button>
                        <button onClick={() => setShowDeleteConfirmation(false)} className="cancel-button">No</button>
                    </div>
                </div>
            )}

            {showOverlay && (
                <div className='overlay'>
                    <div className='overlay-content'>
                        <h2>Add New Event</h2>
                        <form onSubmit={handleSubmitEvent}>
                            <input type='text' name='eventName' placeholder='Event Name' onChange={handleInputChange} required />
                            <input type='text' name='coordinatorName' placeholder='Coordinator Name' onChange={handleInputChange} required />
                            <input type='date' name='date' onChange={handleInputChange} required />
                            <input type='time' name='time' onChange={handleInputChange} required />
                            <input type='number' name='capacity' placeholder='Capacity' onChange={handleInputChange} required />
                            <input type='text' name='venue' placeholder='Venue' onChange={handleInputChange} required />
                            <textarea name='description' placeholder='Description' onChange={handleInputChange} required></textarea>
                            <input type='text' name='category' placeholder='Category' onChange={handleInputChange} required />
                            
                            <select name='clubName' onChange={handleInputChange} required>
                                <option value="">Select Club</option>
                                {clubs.map((club, index) => (
                                    <option key={index} value={club}>{club || "KL Club"}</option>
                                ))}
                            </select>

                            <input type='file' name='image' onChange={handleFileChange} />
                            <button type='submit'>Add Event</button>
                            <button type='button' onClick={handleCloseOverlay}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
