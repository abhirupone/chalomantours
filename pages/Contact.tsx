import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitMessage('❌ Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('📤 Sending your message...');

    try {
      // EmailJS configuration - Replace these with your actual EmailJS credentials
      // 1. Go to https://www.emailjs.com/ and create a free account
      // 2. Create an email service (Gmail, Outlook, etc.)
      // 3. Create an email template
      // 4. Get your Service ID, Template ID, and Public Key from the dashboard
      
      const serviceId = 'service_69ysp7u'; // Your EmailJS service ID
      const templateId = 'template_4ojf82j'; // Your EmailJS template ID
      const publicKey = 'l2PZUKDQalqG2Oe5e'; // Your EmailJS public key

      // Template parameters that will be sent to your email
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Contact Form Submission from Chaloman Tours and Travels',
        message: formData.message,
        to_email: 'chaloman@yahoo.com',
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitMessage('✅ Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitMessage('❌ Failed to send message. Please try again or contact us directly at chaloman@yahoo.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="relative py-24 md:py-32 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/contact-header/1920/1080')"}}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-6 text-center text-white">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold font-serif">Get In Touch</h1>
            <p className="mt-4 text-xl max-w-2xl mx-auto text-light">
              Have questions or ready to book your next trip? We are here to help!
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-secondary p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold font-serif mb-6">Send Us a Message</h2>
              
              {submitMessage && (
                <div className={`mb-4 p-3 rounded ${
                  submitMessage.includes('✅') ? 'bg-green-600/20 text-green-300 border border-green-500' : 
                  submitMessage.includes('❌') ? 'bg-red-600/20 text-red-300 border border-red-500' : 
                  'bg-blue-600/20 text-blue-300 border border-blue-500'
                }`}>
                  <p className="whitespace-pre-wrap">{submitMessage}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-accent mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-light focus:outline-none focus:ring-2 focus:ring-highlight" 
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-accent mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-light focus:outline-none focus:ring-2 focus:ring-highlight" 
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-accent mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-light focus:outline-none focus:ring-2 focus:ring-highlight" 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-accent mb-2">Message *</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-light focus:outline-none focus:ring-2 focus:ring-highlight"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-highlight text-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-highlight font-serif">Contact Information</h3>
                <p className="text-accent mt-2">
                  Reach out to us through any of the following channels. Our team is available 24/7 to assist you.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-highlight">📍</span>
                  <div>
                    <h4 className="font-bold">Address</h4>
                    <p className="text-accent">123 Adventure Lane, Wanderlust City, 98765</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-highlight">✉️</span>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p className="text-accent">chaloman@yahoo.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-highlight">📞</span>
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <p className="text-accent">+91 9831706709</p>
                    <p className="text-accent">+91 9748572187</p>
                  </div>
                </div>
              </div>
              <div className="h-64 bg-secondary rounded-lg overflow-hidden shadow-xl">
                <img src="https://picsum.photos/seed/india-map-destinations/800/400" className="w-full h-full object-cover" alt="India destinations map" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
