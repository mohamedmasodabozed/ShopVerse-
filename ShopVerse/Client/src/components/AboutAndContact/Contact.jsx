 import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer/Footer';
import './Contact.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdSend, MdQuestionAnswer } from 'react-icons/md';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to your backend
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };
  
  return (
    <div className="contact-page bg-gray-50">
      <Header isLoggedIn={true} />
      
      <div className="hero-section bg-orange-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] opacity-20 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">We'd love to hear from you. Reach out to our team with any questions, feedback, or inquiries.</p>
        </div>
      </div>
      
      <div className="container mx-auto p-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-1">
            <div className="contact-info bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>
              
              <div className="contact-methods space-y-6">
                <div className="contact-method flex items-start">
                  <div className="icon-circle bg-orange-100 text-orange-700 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Our Location</h3>
                    <p className="text-gray-600">123 ShopVerse Plaza, Silicon Valley, CA 94043, USA</p>
                  </div>
                </div>
                
                <div className="contact-method flex items-start">
                  <div className="icon-circle bg-orange-100 text-orange-700 p-3 rounded-full mr-4">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone Number</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="contact-method flex items-start">
                  <div className="icon-circle bg-orange-100 text-orange-700 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email Address</h3>
                    <p className="text-gray-600">support@shopverse.com</p>
                    <p className="text-gray-600">info@shopverse.com</p>
                  </div>
                </div>
                
                <div className="contact-method flex items-start">
                  <div className="icon-circle bg-orange-100 text-orange-700 p-3 rounded-full mr-4">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Working Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="social-media mt-8">
                <h3 className="font-semibold text-gray-800 mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="social-icon bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-all">
                    <FaFacebook className="text-xl" />
                  </a>
                  <a href="#" className="social-icon bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-all">
                    <FaTwitter className="text-xl" />
                  </a>
                  <a href="#" className="social-icon bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-all">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="#" className="social-icon bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-all">
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="contact-form bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-6">
                <MdEmail className="text-2xl text-orange-700 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Send Us a Message</h2>
              </div>
              
              {formSubmitted ? (
                <div className="success-message bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Thank you for reaching out!</h3>
                    <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Your Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        placeholder="johndoe@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      placeholder="Please describe your question or concern in detail..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="form-action">
                    <button 
                      type="submit" 
                      className="bg-orange-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-orange-600 transition-all shadow-md flex items-center"
                    >
                      <MdSend className="mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        <div className="faq-section bg-white rounded-xl shadow-md p-8 mb-16">
          <div className="text-center mb-10">
            <div className="section-tag bg-orange-100 text-orange-700 rounded-full px-4 py-1 inline-block mb-4 font-medium">FAQ</div>
            <div className="flex items-center justify-center mb-2">
              <MdQuestionAnswer className="text-orange-700 text-2xl mr-2" />
              <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">Find quick answers to common questions about our services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="faq-item p-5 border border-gray-200 rounded-lg hover:border-orange-200 transition-all">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I track my order?</h3>
              <p className="text-gray-600">You can track your order by logging into your account and navigating to the "Orders" section. There you'll find the tracking number and current status of your delivery.</p>
            </div>
            
            <div className="faq-item p-5 border border-gray-200 rounded-lg hover:border-orange-200 transition-all">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What is your return policy?</h3>
              <p className="text-gray-600">We offer a 30-day return policy for most items. Products must be in their original condition with all tags and packaging intact to be eligible for a return.</p>
            </div>
            
            <div className="faq-item p-5 border border-gray-200 rounded-lg hover:border-orange-200 transition-all">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How long does shipping take?</h3>
              <p className="text-gray-600">Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available at checkout for faster delivery.</p>
            </div>
            
            <div className="faq-item p-5 border border-gray-200 rounded-lg hover:border-orange-200 transition-all">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Do you ship internationally?</h3>
              <p className="text-gray-600">Yes, we ship to most countries worldwide. International shipping times and costs vary by location. You can see the estimated delivery time during checkout.</p>
            </div>
            
            <div className="faq-item p-5 border border-gray-200 rounded-lg hover:border-orange-200 transition-all">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I become a seller on ShopVerse?</h3>
              <p className="text-gray-600">To become a seller, click on the "Sell on ShopVerse" link at the bottom of the homepage and follow the registration process. Our team will review your application within 2-3 business days.</p>
            </div>
            
            <div className="faq-item p-5 border border-gray-200 rounded-lg hover:border-orange-200 transition-all">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and in select regions, we offer cash on delivery and bank transfer options.</p>
            </div>
          </div>
        </div>
        
        <div className="map-section rounded-xl overflow-hidden shadow-lg h-[400px] mb-16">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639290621064!2d-122.08394988469328!3d37.42239997982424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x29cdf01a44fc687f!2sGoogle!5e0!3m2!1sen!2sus!4v1660405356673!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      
      <div className="cta-section bg-orange-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need immediate assistance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Our customer support team is ready to help you 24/7.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="tel:+15551234567" className="bg-white text-orange-700 px-8 py-3 rounded-md font-semibold hover:bg-orange-50 transition-all shadow-lg flex items-center justify-center">
              <FaPhone className="mr-2" /> 
              Call Support
            </a>
            <a href="mailto:support@shopverse.com" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-orange-700 transition-all shadow-lg flex items-center justify-center">
              <FaEnvelope className="mr-2" /> 
              Email Us
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
