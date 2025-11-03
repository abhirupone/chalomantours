import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AnimatedWrapper from '../components/AnimatedWrapper';
import { CameraIcon, MapPinIcon, CalendarIcon, StarIcon } from '../components/Icons';
import { useAuth } from '../contexts/AuthContext';
import type { User } from '../types';

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'activity' | 'settings'>('profile');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Initialize userData when user is available
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-highlight border-t-transparent mx-auto"></div>
          <p className="mt-6 text-light text-xl font-semibold">Loading your profile...</p>
        </div>
      </div>
    );
  }

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

  // Mock data for demonstration
  const userStats = {
    totalBookings: 0,
    totalSpent: 0,
    memberLevel: 'VIP Explorer',
    loyaltyPoints: 250,
    nextReward: 'Free Upgrade',
    memberSince: new Date(userData.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-40 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        <div className="relative container mx-auto px-6 text-center text-white">
          <AnimatedWrapper>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Welcome back, {userData.name.split(' ')[0]}!</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-bold font-serif mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-gradient">
              Your Journey Awaits
            </h1>
            <p className="text-2xl max-w-4xl mx-auto text-white/90 leading-relaxed font-light">
              Discover exclusive experiences, manage your bookings, and unlock amazing travel rewards
            </p>
            <div className="mt-12 flex justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-3xl font-bold text-yellow-400">{userStats.loyaltyPoints}</div>
                <div className="text-sm text-white/80">Loyalty Points</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-3xl font-bold text-green-400">{userStats.totalBookings}</div>
                <div className="text-sm text-white/80">Total Bookings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
                <div className="text-3xl font-bold text-blue-400">10%</div>
                <div className="text-sm text-white/80">Member Discount</div>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-32 relative z-10">
        {/* Main Profile Card */}
        <AnimatedWrapper>
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-12 md:p-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                <div className="relative flex flex-col lg:flex-row items-center gap-12">
                  {/* Profile Picture */}
                  <div className="relative group">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-white/30">
                      <img
                        src={userData.avatar}
                        alt="Profile Avatar"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleImageChange}
                      className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 border-2 border-white"
                      aria-label="Change profile picture"
                    >
                      <CameraIcon className="w-10 h-10" />
                    </button>
                    {/* Online Status */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                      <h2 className="text-4xl md:text-5xl font-bold">{userData.name}</h2>
                      <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm animate-bounce">
                        {userStats.memberLevel}
                      </div>
                    </div>
                    <p className="text-white/90 text-xl mb-6">{userData.email}</p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                      <div className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/30">
                        <CalendarIcon className="w-5 h-5" />
                        <span>Member since {userStats.memberSince}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/30">
                        <StarIcon className="w-5 h-5" />
                        <span>{userStats.loyaltyPoints} Points</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/30">
                        <span className="text-lg">🎯</span>
                        <span>Next: {userStats.nextReward}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                <div className="flex justify-center gap-8">
                  {[
                    { id: 'profile', label: 'Profile', icon: '👤' },
                    { id: 'activity', label: 'Activity', icon: '📊' },
                    { id: 'settings', label: 'Settings', icon: '⚙️' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                          : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8 md:p-12">
                {activeTab === 'profile' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Edit Profile Section */}
                    <div className="lg:col-span-2">
                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            👤
                          </div>
                          Edit Profile
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                              <label htmlFor="name" className="block text-gray-900 font-bold mb-3 text-lg">
                                Full Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 hover:border-gray-300"
                                placeholder="Your full name"
                              />
                            </div>
                            <div className="group">
                              <label htmlFor="email" className="block text-gray-900 font-bold mb-3 text-lg">
                                Email Address
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 hover:border-gray-300"
                                placeholder="your@email.com"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                            {savedMessage && (
                              <div className="flex items-center gap-3 text-green-600 font-bold text-lg animate-bounce">
                                <span className="text-2xl">🎉</span>
                                {savedMessage}
                              </div>
                            )}
                            <button
                              type="submit"
                              disabled={!isEditing}
                              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 px-10 rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:text-gray-300 transform hover:scale-105 shadow-lg hover:shadow-xl ml-auto"
                            >
                              {isEditing ? '✨ Save Changes' : 'No Changes'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                      {/* Achievements */}
                      <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white rounded-2xl p-8 shadow-xl">
                        <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                          <span className="text-3xl">🏆</span>
                          Achievements
                        </h4>
                        <div className="space-y-4">
                          {[
                            { icon: '🏆', title: 'First Booking', description: 'Completed your first tour booking', unlocked: true },
                            { icon: '⭐', title: 'VIP Member', description: 'Reached VIP member status', unlocked: true },
                            { icon: '🎯', title: 'Explorer', description: 'Visited 5+ destinations', unlocked: false },
                            { icon: '🌟', title: 'Loyal Traveler', description: 'Booked 10+ tours', unlocked: false }
                          ].map((achievement, index) => (
                            <div
                              key={index}
                              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                                achievement.unlocked
                                  ? 'bg-white/20 backdrop-blur-sm border border-white/30'
                                  : 'bg-black/20 opacity-60'
                              }`}
                            >
                              <span className="text-3xl">{achievement.icon}</span>
                              <div>
                                <div className="font-bold text-lg">{achievement.title}</div>
                                <div className="text-yellow-100 text-sm">{achievement.description}</div>
                              </div>
                              {achievement.unlocked && (
                                <div className="ml-auto text-2xl animate-bounce">✨</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                        <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                          <span className="text-3xl">🚀</span>
                          Quick Actions
                        </h4>
                        <div className="space-y-4">
                          {[
                            { to: '/destinations', icon: '🗺️', title: 'Browse Destinations', desc: 'Discover new places' },
                            { to: '/custom-tour', icon: '🎯', title: 'Plan Custom Tour', desc: 'Create your itinerary' },
                            { to: '/contact', icon: '💬', title: 'Contact Support', desc: 'Get help anytime' }
                          ].map((action, index) => (
                            <Link
                              key={index}
                              to={action.to}
                              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group border border-gray-100 hover:border-indigo-200 hover:shadow-lg transform hover:scale-105"
                            >
                              <span className="text-3xl group-hover:animate-bounce">{action.icon}</span>
                              <div>
                                <div className="font-bold text-gray-900 group-hover:text-indigo-600">{action.title}</div>
                                <div className="text-gray-600 text-sm group-hover:text-purple-600">{action.desc}</div>
                              </div>
                              <div className="ml-auto text-gray-400 group-hover:text-indigo-500 transition-colors">
                                →
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-6">📊</div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Activity Dashboard</h3>
                    <p className="text-gray-600 text-lg">Your booking history and travel activity will appear here.</p>
                    <div className="mt-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-8 inline-block">
                      <div className="text-4xl font-bold text-indigo-600 mb-2">Coming Soon!</div>
                      <div className="text-purple-600">Track your travel journey</div>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-6">⚙️</div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Account Settings</h3>
                    <p className="text-gray-600 text-lg">Manage your account preferences and privacy settings.</p>
                    <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 inline-block">
                      <div className="text-4xl font-bold text-green-600 mb-2">Coming Soon!</div>
                      <div className="text-blue-600">Advanced customization options</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-gradient { animation: gradient 3s ease infinite; background-size: 200% 200%; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Profile;
