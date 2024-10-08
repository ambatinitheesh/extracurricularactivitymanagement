import React from 'react'
import logo from '../images/Cultural.png'
import '../components/events.css'
const Events = () => {
  return (
    <div className='Events'>
        <div className='Events-header'>
            <div className='Events-title'><p>All Events</p></div>
            <p>All the Best!</p>
        </div>
        <div className='Events-body'>
            <div className="Events-card">
                <div className="Events-image">
                <img className='Events-image-container'src={logo}/>
                </div>
                <div className="Events-description">
                <div className="Event-title">
                    <p>Singing</p>
                </div>
                <div className='Event-description-body'>
                    <p><p>Celebrate your artistic spirit by submitting your original artwork in any medium. Whether it’s painting, drawing, or digital art, showcase your unique style and creativity. </p></p>
                </div>
                </div>
                <button className='know-more'>Know More</button>
            </div>
            <div className="Events-card">
                <div className="Events-image">
                <img className='Events-image-container'src={logo}/>
                </div>
                <div className="Events-description">
                <div className="Event-title">
                    <p>Shooting</p>
                </div>
                <div className='Event-description-body'>
                    <p><p>Celebrate your artistic spirit by submitting your original artwork in any medium. Whether it’s painting, drawing, or digital art, showcase your unique style and creativity. </p></p>
                </div>
                </div>
                <button className='know-more'>Know More</button>
            </div>
            <div className="Events-card">
                <div className="Events-image">
                <img className='Events-image-container'src={logo}/>
                </div>
                <div className="Events-description">
                <div className="Event-title">
                    <p>Creative Writing</p>
                </div>
                <div className='Event-description-body'>
                    <p><p>Celebrate your artistic spirit by submitting your original artwork in any medium. Whether it’s painting, drawing, or digital art, showcase your unique style and creativity. </p></p>
                </div>
                </div>
                <button className='know-more'>Know More</button>
            </div>
            <div className="Events-card">
                <div className="Events-image">
                <img className='Events-image-container'src={logo}/>
                </div>
                <div className="Events-description">
                <div className="Event-title">
                    <p>Dancing</p>
                </div>
                <div className='Event-description-body'>
                    <p><p>Celebrate your artistic spirit by submitting your original artwork in any medium. Whether it’s painting, drawing, or digital art, showcase your unique style and creativity. </p></p>
                </div>
                </div>
                <button className='know-more'>Know More</button>
            </div>
            <div className="Events-card">
                <div className="Events-image">
                <img className='Events-image-container'src={logo}/>
                </div>
                <div className="Events-description">
                <div className="Event-title">
                    <p>Cyber Security</p>
                </div>
                <div className='Event-description-body'>
                    <p><p>Celebrate your artistic spirit by submitting your original artwork in any medium. Whether it’s painting, drawing, or digital art, showcase your unique style and creativity. </p></p>
                </div>
                </div>
                <button className='know-more'>Know More</button>
            </div>
            <div className="Events-card">
                <div className="Events-image">
                <img className='Events-image-container'src={logo}/>
                </div>
                <div className="Events-description">
                <div className="Event-title">
                    <p>Running</p>
                </div>
                <div className='Event-description-body'>
                    <p><p>Celebrate your artistic spirit by submitting your original artwork in any medium. Whether it’s painting, drawing, or digital art, showcase your unique style and creativity. </p></p>
                </div>
                </div>
                <button className='know-more'>Know More</button>
            </div>
        </div>
      
    </div>
  )
}

export default Events
