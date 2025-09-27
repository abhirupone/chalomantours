import React from 'react';
import type { Destination } from '../types';
import { StarIcon } from './Icons';

interface DestinationCardProps {
  destination: Destination;
  onCardClick: (destination: Destination) => void;
  aiReason?: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onCardClick, aiReason }) => {
  return (
    <button 
        onClick={() => onCardClick(destination)}
        className="bg-secondary rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col text-left w-full focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 focus:ring-offset-primary"
        aria-label={`View details for ${destination.name}`}
    >
      <div className="relative overflow-hidden h-60">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {destination.originalPrice ? (
            <div className="absolute top-0 right-0 m-4 text-right">
                <span className="bg-highlight text-primary font-bold px-3 py-1 rounded-md text-sm shadow-lg">SALE</span>
                <div className="mt-1 flex items-baseline justify-end gap-2 bg-primary/80 backdrop-blur-sm p-2 rounded-md">
                    <span className="text-light/80 line-through text-md">₹{destination.originalPrice}</span>
                    <span className="text-light font-bold text-xl">₹{destination.price}</span>
                </div>
            </div>
        ) : (
            <div className="absolute top-0 right-0 bg-highlight text-primary font-bold px-3 py-1 m-4 rounded-md text-sm">
                ₹{destination.price}
            </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-2xl font-bold font-serif text-light">{destination.name}</h3>
                <p className="text-accent font-semibold">{destination.country}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
                <StarIcon className="h-5 w-5" />
                <span className="font-bold text-light">{destination.rating.toFixed(1)}</span>
            </div>
        </div>
        
        {aiReason && (
            <div className="mt-4 p-3 bg-accent/20 rounded-md border-l-4 border-highlight">
                <p className="text-sm italic text-light">
                    <span className="font-bold not-italic text-highlight">AI Suggestion:</span> {aiReason}
                </p>
            </div>
        )}

        <p className="mt-4 text-accent text-md leading-relaxed flex-grow">{destination.description}</p>
      </div>
    </button>
  );
};

export default DestinationCard;