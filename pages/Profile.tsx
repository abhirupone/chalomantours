import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CURRENT_USER } from '../constants';
import AnimatedWrapper from '../components/AnimatedWrapper';
import { CameraIcon } from '../components/Icons';
import type { User } from '../types';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<User>(CURRENT_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    if (!isEditing) setIsEditing(true);
    if (savedMessage) setSavedMessage('');
  };
  
  const handleImageChange = () => {
    // Simulate changing profile picture by appending a random number to the seed
    const newAvatar = `https://picsum.photos/seed/user-avatar-${Math.random()}/200/200`;
    setUserData(prev => ({ ...prev, avatar: newAvatar }));
    if (!isEditing) setIsEditing(true);
    if (savedMessage) setSavedMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server.
    console.log('Saving user data:', userData);
    setIsEditing(false);
    setSavedMessage('Profile updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section className="relative py-24 md:py-32 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/profile-header/1920/1080')"}}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-6 text-center text-white">
            <AnimatedWrapper>
                <h1 className="text-5xl md:text-6xl font-bold font-serif">My Profile</h1>
                <p className="mt-4 text-xl max-w-2xl mx-auto text-light">
                    View and manage your personal information.
                </p>
            </AnimatedWrapper>
        </div>
      </section>

      {/* Profile Form */}
      <section className="container mx-auto px-6 -mt-32">
        <AnimatedWrapper>
          <div className="max-w-4xl mx-auto bg-secondary p-8 rounded-lg shadow-2xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              
              {/* Profile Picture */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="relative group w-40 h-40">
                  <img src={userData.avatar} alt="Profile Avatar" className="w-full h-full rounded-full object-cover border-4 border-accent" />
                  <button
                    type="button"
                    onClick={handleImageChange}
                    className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-highlight"
                    aria-label="Change profile picture"
                  >
                    <CameraIcon className="w-8 h-8" />
                  </button>
                </div>
                <p className="text-accent text-sm mt-2 text-center">Click image to change</p>
              </div>

              {/* User Details */}
              <div className="md:col-span-2 space-y-6">
                 <div>
                  <label htmlFor="name" className="block text-accent mb-2 font-semibold">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-light focus:outline-none focus:ring-2 focus:ring-highlight"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-accent mb-2 font-semibold">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-light focus:outline-none focus:ring-2 focus:ring-highlight"
                  />
                </div>
                <div className="flex items-center justify-end gap-4 h-8">
                    {savedMessage && <p className="text-green-400 text-sm animate-fade-in-up">{savedMessage}</p>}
                    <button
                        type="submit"
                        disabled={!isEditing}
                        className="bg-highlight text-primary font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 disabled:bg-accent disabled:cursor-not-allowed"
                    >
                        Save Changes
                    </button>
                </div>
              </div>

            </form>
          </div>
        </AnimatedWrapper>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-6">
        <AnimatedWrapper>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-serif text-center mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/destinations"
                className="bg-secondary p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-2">Browse Destinations</h3>
                <p className="text-accent">Discover new places to explore</p>
              </Link>
              <Link
                to="/custom-tour"
                className="bg-secondary p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-2">Plan Custom Tour</h3>
                <p className="text-accent">Create your perfect itinerary</p>
              </Link>
              <Link
                to="/contact"
                className="bg-secondary p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-2">Contact Support</h3>
                <p className="text-accent">Get help with your bookings</p>
              </Link>
            </div>
          </div>
        </AnimatedWrapper>
      </section>
    </div>
  );
};

export default Profile;
