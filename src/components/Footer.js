import React from 'react'
import './footer.css'
import footer_logo from '../images/logo.png'
import insta from '../images/instagram_icon.png'
import pin from '../images/pintester_icon.png'
import wap from '../images/whatsapp_icon.png'

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <img src={footer_logo} alt=""/>
        <p>Student Sphere</p>
      </div> 
      <div className='footer-blocks'>
        <div className='footer-block-body'>
          <p>Quick Links</p>
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="/clubs">Clubs</a>
          <a href="/login">Login</a>
        </div>
        <div className='footer-block-body'>
          <p>Follow Us</p>
          <a href="/"><img style={{paddingRight:"5px"}} src={insta} alt="Instagram"/>Instagram</a> 
           <a href="/"><img style={{paddingRight:"5px"}} src={pin} alt="Pinterest"/>Pinterest</a>
          <a href="/"><img style={{paddingRight:"5px"}} src={wap} alt="Whatsapp"/>Whatsapp</a>
        </div>
        <div className='footer-block-body-contact'>
           <p style={{color:"white"}}> Contact Us</p>
          <p>Student Sphere</p>
          <p>123, ABC Street, XYZ City</p>
          <p>studentsphereadmin@gmail.com</p>
          <p>Phn:0863-2232344</p>
        </div>
      </div>
      <div className='footer-copyright'>
        <p>© 2024 Student Sphere. All Rights Reserved</p>
      </div>
    </div>
  )
}
