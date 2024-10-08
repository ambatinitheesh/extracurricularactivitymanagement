import React from 'react'
import header1 from '../images/header1.png'
import cultural from '../images/Cultural.png'
import clubs from '../images/clubs.png'
import sports from '../images/sports.jpg'
const Home = () => {
  return (
    <div className='App-body'>
      <div className='App-body-header'>
        <img className='App-body-banner'src={header1}alt="Banner"/>
      </div>
      <div className="App-body-about">
        <div className="App-body-about-header">
        <p>Quick Links</p>
        </div>
        <div className='App-body-about-descrption'>
        <div className="App-body-card">
          <div className="App-body-card-images">
        <img className="App-body-card-image" src={cultural} alt="image"/>
          </div>
          <div className='App-body-card-body'>
            <div className="App-body-card-header">
              <p>Events</p>
            </div>
            <div className='App-body-card-para'>
          <p>Join us for our exciting upcoming events! Connect, learn, and have fun with like-minded individuals. Don’t miss out—RSVP today to secure your spot!</p>
            </div>
            <button className='App-body-button'>Know More</button>
          </div> 
        </div>
        <div className="App-body-card">
          <div className="App-body-card-images">
        <img className="App-body-card-image" src={clubs} alt="image"/>
          </div>
          <div className='App-body-card-body'>
            <div className="App-body-card-header">
              <p>Clubs</p>
            </div>
            <div className='App-body-card-para'>
          <p>Join us for our exciting upcoming events! Connect, learn, and have fun with like-minded individuals. Don’t miss out—RSVP today to secure your spot!</p>
            </div>
            <button className='App-body-button'>Know More</button>
          </div> 
        </div>
        <div className="App-body-card">
          <div className="App-body-card-images">
        <img className="App-body-card-image" src={sports} alt="image"/>
          </div>
          <div className='App-body-card-body'>
            <div className="App-body-card-header">
              <p>Sports</p>
            </div>
            <div className='App-body-card-para'>
          <p>Join us for our exciting upcoming events! Connect, learn, and have fun with like-minded individuals. Don’t miss out—RSVP today to secure your spot!</p>
            </div>
            <button className='App-body-button'>Know More</button>
          </div> 
        </div>
        </div>
      </div>
      <div class="about-us">
        <div className="about-header">
          <p className='about-header-title'>About Us</p>
        </div>
    <div class="card">
        <h3>What We Offer</h3>
        <p><strong>Activity Management:</strong> Our platform allows administrators to effortlessly manage extracurricular activity schedules, ensuring that all events are organized and up-to-date.</p>
        <p><strong>Participation Tracking:</strong> Keep track of student involvement across various activities, helping to foster a sense of community and belonging.</p>
        <p><strong>Event Registrations:</strong> Students can easily register for their favorite activities and events, simplifying the sign-up process and ensuring they never miss out on opportunities.</p>
        <p><strong>Notifications:</strong> Stay informed with timely updates and notifications about upcoming events, ensuring students are always in the loop.</p>
    </div>

    <div class="card">
        <h3>Join Us</h3>
        <p>Join us as we aim to enrich the student experience by promoting active participation in extracurricular activities. Together, let's build a vibrant and engaging school community!</p>
    </div>
</div>

    </div>
  )
}

export default Home
