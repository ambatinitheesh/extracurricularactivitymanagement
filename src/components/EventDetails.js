import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaClock, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import logo from '../images/Cultural.png';
import '../components/eventDetails.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/events.css';

const EventDetails = () => {
    const { eventname } = useParams(); // Get event name from URL
    const [event, setEvent] = useState(null);
    const [similarEvents, setSimilarEvents] = useState([]);
    const [editEvent, setEditEvent] = useState({
        eventName: '',
        coordinatorName: '',
        date: '',
        time: '',
        capacity: '',
        venue: '',
        description: '',
        category: '',
        clubName: '',
    });
    const [registerStatus, setRegisterStatus] = useState('');
    const navigate = useNavigate();
    const studentEmail = localStorage.getItem('email');
    const role = localStorage.getItem('role'); // Get role from localStorage
    const [showEditModal, setShowEditModal] = useState(false);
    const [newImage, setNewImage] = useState(null);
    
    const [showOverlay, setShowOverlay] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    let max=4;
    

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    };
    const handleDeleteEvent = () => {
        axios.delete(`https://springbootactivitymanagement-production.up.railway.app/delete-event`,{
            params: {
                eventName: eventToDelete,
            },
        })
            .then(() => {
                setShowDeleteConfirmation(false);
                max++;
                toast.success('Event deleted successfully!', {
                    position:'top-right', 
                });
                setSimilarEvents(prevEvents => prevEvents.filter(event => event.eventName !== eventToDelete));
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
        window.location.reload();
    };

    
    useEffect(() => {
        axios.get(`https://springbootactivitymanagement-production.up.railway.app/viewevent`, {
            params: { eventname: eventname },
        })
        .then((response) => {
            setEvent(response.data);
        })
        .catch((error) => {
            console.error("Error fetching event details:", error);
        });

        axios.get(`https://springbootactivitymanagement-production.up.railway.app/events`)
        .then((response) => {
            setSimilarEvents(response.data.slice(0, max)); // Get first 3 events
        })
        .catch((error) => {
            console.error("Error fetching similar events:", error);
        });
        if (studentEmail && role !== '1') { // Only check registration if not admin
            axios.get(`https://springbootactivitymanagement-production.up.railway.app/check-registration`, {
                params: {
                    email: studentEmail,
                    eventname: eventname,
                },
            })
            .then((response) => {
                if (response.data === true) {
                    setRegisterStatus("Registered");
                }
            })
            .catch((error) => {
                console.error("Error checking registration status:", error);
            });
        }
    }, [eventname, studentEmail, role]);
    
    
    // When `event` is updated, sync `editEvent`
    useEffect(() => {
        if (event) {
            setEditEvent({
                eventName: event.eventName,
                coordinatorName: event.coordinatorName,
                date: event.date,
                time: event.time,
                capacity: event.capacity,
                venue: event.venue,
                description: event.description,
                category: event.category,
                clubName: event.club.clubName,
            });
        }
    }, [event]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("eventName", editEvent.eventName);
        formData.append("coordinatorName", editEvent.coordinatorName);
        formData.append("date", editEvent.date);
        formData.append("time", editEvent.time);
        formData.append("capacity", editEvent.capacity);
        formData.append("venue", editEvent.venue);
        formData.append("description", editEvent.description);
        formData.append("category", editEvent.category);
        formData.append("clubName", editEvent.clubName);
        if (newImage) formData.append("image", newImage);
    
        axios.post(`https://springbootactivitymanagement-production.up.railway.app/update-event`, formData)
        .then((response) => {
            toast.success("Event updated successfully!");
            setShowEditModal(false);
            // Reload event data
            setEvent(response.data); // Refresh event data with the updated details
        })
        .catch((error) => {
            console.error("Error updating event:", error);
            toast.error("Failed to update the event.");
        });
    };

    const handleUnRegister = () => {
        axios.delete(`https://springbootactivitymanagement-production.up.railway.app/unregister`, {
            params: {
                email: studentEmail,
                eventname: eventname,
            },
        })
        .then((response) => {
            toast.success("Unregistered successfully!");
            setRegisterStatus('');
        })
        .catch((error) => {
            console.error("Error unregistering for event:", error);
            toast.error("Unregistration failed. Please try again.");
        });
    };

    const handleRegister = () => {
        if (!studentEmail) {
            toast.warning("Please log in to register for the event");
            return;
        }
        axios.post(`https://springbootactivitymanagement-production.up.railway.app/register`, null, {
            params: {
                email: studentEmail,
                eventname: eventname,
            },
        })
        .then((response) => {
            toast.success("Registered successfully!");
            setRegisterStatus('Registered');
        })
        .catch((error) => {
            console.error("Error registering for event:", error);
            toast.error("Registration failed. Please try again.");
        });
    };
    

    if (!event) {
        return <p>Loading...</p>;
    }

    return (
        <div className="EventDetails">
            <ToastContainer />
            <button onClick={() => navigate(-1)} className="back-button">Back to Events</button>
            <div className="EventDetails-card">
                <img src={`data:image/jpeg;base64,${event.image}`} alt="Event" className="EventDetails-image" />
                <div className="EventDetails-content">
                    <h2>{event.eventName}</h2>
                    <div className="EventDetails-description">{event.description}</div>

                    <div className="EventDetails-info-row">
                        <FaMapMarkerAlt />
                        <span>Venue:</span> {event.venue}
                    </div>
                    <div className="EventDetails-info-row">
                        <FaClock />
                        <span>Date:</span> {event.date} at {event.time}
                    </div>
                    <div className="EventDetails-info-row">
                        <span>Slots Left:</span> {event.capacity}
                    </div>

                    <div className="EventDetails-contact-info">
                        <p><FaUser /> Organizer: {event.club ? event.club.clubName : 'N/A'}</p>
                        <p><FaPhone /> Coordinator: {event.coordinatorName}</p>
                    </div>

                    {role === '1' ? (
                        <>
                            <button onClick={() => setShowEditModal(true)} className="edit-button">Edit Event</button>
                            {showEditModal && (
                                <div className="overlay">
                                    <div className="modal">
                                        <h3>Edit Event</h3>
                                        <form onSubmit={handleEditSubmit}>
                                            <label>
                                                Event Name:
                                                <input
                                                    type="text"
                                                    value={editEvent.eventName}
                                                    onChange={(e) => setEditEvent({ ...editEvent, eventName: e.target.value })}
                                                    readOnly
                                                />
                                            </label>
                                            <label>
                                                Coordinator Name:
                                                <input
                                                    type="text"
                                                    value={editEvent.coordinatorName}
                                                    onChange={(e) => setEditEvent({ ...editEvent, coordinatorName: e.target.value })}
                                                />
                                            </label>
                                            <label>
                                                Date:
                                                <input
                                                    type="date"
                                                    value={editEvent.date}
                                                    onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
                                                />
                                            </label>
                                            <label>
                                                Time:
                                                <input
                                                    type="time"
                                                    value={editEvent.time}
                                                    onChange={(e) => setEditEvent({ ...editEvent, time: e.target.value })}
                                                />
                                            </label>
                                            <label>
                                                Capacity:
                                                <input
                                                    type="number"
                                                    value={editEvent.capacity}
                                                    onChange={(e) => setEditEvent({ ...editEvent, capacity: e.target.value })}
                                                />
                                            </label>
                                            <label>
                                                Venue:
                                                <input
                                                    type="text"
                                                    value={editEvent.venue}
                                                    onChange={(e) => setEditEvent({ ...editEvent, venue: e.target.value })}
                                                />
                                            </label>
                                            <label>
                                                Description:
                                                <textarea
                                                    value={editEvent.description}
                                                    onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
                                                />
                                            </label>
                                            <label>
                                                Category:
                                                <input
                                                    type="text"
                                                    value={editEvent.category}
                                                    onChange={(e) => setEditEvent({ ...editEvent, category: e.target.value })}
                                                />
                                            </label>
                                            <label>
                                                Club Name:
                                                <input
                                                    type="text"
                                                    value={editEvent.clubName}
                                                    onChange={(e) => setEditEvent({ ...editEvent, clubName: e.target.value })}
                                                />
                                            </label>
                                            <label>
                                                Change Image:
                                                <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                                            </label>
                                            <button className="save-button"type="submit">Update Event</button>
                                            <button className='cancel-button' type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {registerStatus === 'Registered' ? (
                                <button onClick={handleUnRegister} className="cancel-button">Unregister</button>
                            ) : (
                                <button onClick={handleRegister} className="register-button">Register</button>
                            )}
                        </>
                    )}
                </div>
            </div>
           <h1>Similar Events</h1>
                <div className="Events-Similar">
                {similarEvents.map((event, index) => (
                    <div className="Events-card1" key={index}>
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
                    {showDeleteConfirmation && (
                <div className="confirmation-overlay">
                    <div className="confirmation-content">
                        <p>Are you sure you want to delete this event?</p>
                        <button onClick={handleDeleteEvent} className="confirm-button">Yes</button>
                        <button onClick={() => setShowDeleteConfirmation(false)} className="cancel-button">No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetails;
