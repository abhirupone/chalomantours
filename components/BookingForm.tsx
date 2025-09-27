import React, { useState } from 'react';
import type { BookingDetails } from '../types';

interface BookingFormProps {
  destinationName: string;
  price: number;
  onSubmit: (details: BookingDetails) => void;
  onBack: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ destinationName, price, onSubmit, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !startDate || !endDate) {
      setError('Please fill out all fields.');
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
        setError('End date must be after the start date.');
        return;
    }
    setError('');
    onSubmit({ name, email, startDate, endDate });
  };

  return (
    <div className="p-6 md:p-8 flex flex-col h-full">
      <h3 id="booking-form-title" className="text-2xl lg:text-3xl font-bold font-serif text-light">Book Your Trip to {destinationName}</h3>
      <p className="text-accent mt-2">Complete the form below to request your booking.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 flex-grow flex flex-col">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-accent mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-accent/20 border border-accent/30 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-highlight"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-accent mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-accent/20 border border-accent/30 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-highlight"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-accent mb-1">Start Date</label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    min={today}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-accent/20 border border-accent/30 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-highlight"
                    required
                />
            </div>
            <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-accent mb-1">End Date</label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    min={startDate || today}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-accent/20 border border-accent/30 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-highlight"
                    required
                />
            </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex-grow"></div>

        <div className="mt-auto pt-4 space-y-3">
            <div className="flex justify-between items-center text-light">
                <span className="text-xl font-semibold">Total Price:</span>
                <span className="text-2xl font-bold text-highlight">₹{price}</span>
            </div>
            <div className="flex items-center gap-4">
                 <button
                    type="button"
                    onClick={onBack}
                    className="w-1/3 bg-accent/50 text-light font-bold py-3 px-6 rounded-lg hover:bg-accent/80 transition-colors duration-300 text-lg"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="w-2/3 bg-highlight text-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors duration-300 text-lg"
                >
                    Confirm Booking
                </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
