import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Destination, BookingDetails } from '../types';
import { CloseIcon, StarIcon, CheckCircleIcon } from './Icons';
import BookingForm from './BookingForm';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ destination, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [view, setView] = useState<'details' | 'booking' | 'success'>('details');

    const onCloseRef = useRef(onClose);
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            onCloseRef.current();
             // Reset view after closing animation completes, so it's fresh for next open
            setTimeout(() => setView('details'), 100);
        }, 300);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [handleClose]);
    
    const handleBookingSubmit = (bookingDetails: BookingDetails) => {
        console.log('Booking submitted for', destination?.name, bookingDetails);
        setView('success');
    };

    // When the destination prop changes (i.e., a new modal is opened), reset the view.
    useEffect(() => {
      if (destination) {
        setView('details');
        setIsClosing(false);
      }
    }, [destination]);

    if (!destination) {
        return null;
    }
    
    const animationClass = isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

    const renderContent = () => {
        switch (view) {
            case 'booking':
                return (
                    <BookingForm
                        destinationName={destination.name}
                        price={destination.price}
                        onSubmit={handleBookingSubmit}
                        onBack={() => setView('details')}
                    />
                );
            case 'success':
                return (
                    <div className="p-6 md:p-8 flex flex-col h-full items-center justify-center text-center">
                        <CheckCircleIcon className="w-16 h-16 text-green-400 mb-4" />
                        <h3 className="text-3xl font-bold font-serif text-light">Booking Request Sent!</h3>
                        <p className="text-accent mt-4 max-w-sm">
                            Thank you for your interest in {destination.name}. A confirmation and further details will be sent to your email shortly.
                        </p>
                        <button onClick={handleClose} className="mt-8 w-full bg-highlight text-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors duration-300 text-lg">
                            Close
                        </button>
                    </div>
                );
            case 'details':
            default:
                return (
                    <div className="p-6 md:p-8 flex flex-col h-full">
                        <div className="flex justify-between items-start">
                            <div>
                                 <h2 id="destination-modal-title" className="text-3xl lg:text-4xl font-bold font-serif text-light">{destination.name}</h2>
                                <p className="text-accent font-semibold text-lg">{destination.country}</p>
                            </div>
                            <button onClick={handleClose} className="text-accent hover:text-light transition-colors" aria-label="Close modal">
                                <CloseIcon className="h-7 w-7" />
                            </button>
                        </div>

                        <div className="flex justify-between items-center my-4">
                            <div className="flex items-center gap-2 text-yellow-400">
                                <StarIcon className="h-6 w-6" />
                                <span className="font-bold text-light text-xl">{destination.rating.toFixed(1)}</span>
                            </div>
                            <div className="bg-highlight text-primary font-bold px-4 py-2 rounded-md text-xl">
                                ₹{destination.price}
                            </div>
                        </div>
                        
                        <div className="text-accent leading-relaxed flex-grow pr-2 overflow-y-auto">
                            <p>{destination.description}</p>
                            <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>

                        <div className="flex gap-3 mt-6 shrink-0">
                            <Link
                                to="/contact"
                                onClick={handleClose}
                                className="flex-1 bg-accent text-primary font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 transition-colors duration-300 text-center text-lg"
                            >
                                Get Quote
                            </Link>
                            <button 
                                onClick={() => setView('booking')}
                                className="flex-1 bg-highlight text-primary font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 transition-colors duration-300 text-lg">
                                Book This Trip
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby={view === 'booking' ? 'booking-form-title' : 'destination-modal-title'}
        >
            <div
                className={`bg-secondary rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row transform transition-all duration-300 ${animationClass}`}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                     <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
                </div>
               
                <div className="w-full md:w-1/2 flex flex-col overflow-hidden">
                   {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default DestinationModal;