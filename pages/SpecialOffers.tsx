import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../constants';
import DestinationCard from '../components/DestinationCard';
import AnimatedWrapper from '../components/AnimatedWrapper';
import DestinationModal from '../components/DestinationModal';
import type { Destination } from '../types';

const SpecialOffers: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const openModal = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const closeModal = () => {
    setSelectedDestination(null);
  };
  
  const offerDestinations = useMemo(() => {
    return DESTINATIONS.filter(dest => dest.originalPrice);
  }, []);

  return (
    <>
      <div className="bg-primary min-h-screen">
        {/* Page Header */}
        <section className="relative py-24 md:py-32 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/offers-header/1920/1080')"}}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative container mx-auto px-6 text-center text-white">
              <AnimatedWrapper>
                  <h1 className="text-5xl md:text-6xl font-bold font-serif">Special Offers</h1>
                  <p className="mt-4 text-xl max-w-2xl mx-auto text-light">
                      Exclusive deals on our most popular destinations. Book your dream vacation for less!
                  </p>
              </AnimatedWrapper>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="container mx-auto px-6 py-16">
          {offerDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offerDestinations.map((dest, index) => (
                <AnimatedWrapper key={dest.id} delay={`${index * 100}ms`}>
                  <DestinationCard destination={dest} onCardClick={openModal} />
                </AnimatedWrapper>
              ))}
            </div>
          ) : (
            <AnimatedWrapper>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold font-serif text-light">No Special Offers Available</h2>
                <p className="text-accent mt-2">Please check back later for exclusive deals.</p>
              </div>
            </AnimatedWrapper>
          )}
        </section>

        {/* Call to Action */}
        <section className="relative py-24 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/offers-cta/1920/1080')"}}>
          <div className="absolute inset-0 bg-primary/80"></div>
          <div className="relative container mx-auto px-6 text-center">
            <AnimatedWrapper>
              <h2 className="text-4xl font-bold font-serif mb-4 text-light">Don't Miss Out!</h2>
              <p className="text-xl text-accent max-w-3xl mx-auto mb-8">
                These exclusive offers won't last forever. Book your dream vacation today and save big!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-highlight text-primary font-bold py-4 px-8 rounded-lg text-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
                  Get Quote
                </Link>
                <Link to="/custom-tour" className="bg-secondary text-light font-bold py-4 px-8 rounded-lg text-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 border-2 border-accent">
                  Plan Custom Trip
                </Link>
              </div>
            </AnimatedWrapper>
          </div>
        </section>
      </div>

      {selectedDestination && <DestinationModal destination={selectedDestination} onClose={closeModal} />}
    </>
  );
};

export default SpecialOffers;