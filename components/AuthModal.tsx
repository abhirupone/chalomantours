import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CloseIcon } from './Icons';
import type { LoginCredentials, SignupCredentials } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { login, signup } = useAuth();

  const [loginData, setLoginData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState<SignupCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(loginData);

    if (result.success) {
      onClose();
      setLoginData({ email: '', password: '' });
    } else {
      setError(result.error || 'Login failed');
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await signup(signupData);

    if (result.success) {
      // Switch to login mode instead of closing modal
      setMode('login');
      setSignupData({ name: '', email: '', password: '', confirmPassword: '' });
      setLoginData({ email: signupData.email, password: '' }); // Pre-fill email
      setError(''); // Clear any errors
    } else {
      setError(result.error || 'Signup failed');
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-2xl font-bold text-center text-primary">
            {mode === 'login' ? 'Welcome Back' : 'Join Chaloman Tours'}
          </h2>
          <p className="text-center text-accent mt-2">
            {mode === 'login'
              ? 'Sign in to get 10% discount on all bookings'
              : 'Create an account to unlock exclusive discounts'
            }
          </p>
        </div>

        {/* Form */}
        <div className="px-6 pb-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-900 mb-1">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-900 mb-1">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                  placeholder="Your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-highlight text-primary font-bold py-3 px-4 rounded-md hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-900 mb-1">
                  Full Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  required
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-900 mb-1">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-900 mb-1">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  minLength={6}
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-900 mb-1">
                  Confirm Password
                </label>
                <input
                  id="signup-confirm-password"
                  type="password"
                  required
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-highlight text-primary font-bold py-3 px-4 rounded-md hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              className="text-highlight hover:text-opacity-80 transition-colors"
            >
              {mode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;