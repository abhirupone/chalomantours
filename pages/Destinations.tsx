import React, { useState, useMemo } from 'react';
import { DESTINATIONS } from '../constants';
import DestinationCard from '../components/DestinationCard';
import AnimatedWrapper from '../components/AnimatedWrapper';
import DestinationModal from '../components/DestinationModal';
import { SearchIcon, ChevronDownIcon } from '../components/Icons';
import type { Destination } from '../types';

const Destinations: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('popularity');

  const openModal = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const closeModal = () => {
    setSelectedDestination(null);
  };
  
  const filteredAndSortedDestinations = useMemo(() => {
    return DESTINATIONS
      .filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortOption) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'rating_desc':
            return b.rating - a.rating;
          case 'popularity':
          default:
            return a.id - b.id; // Default order
        }
      });
  }, [searchTerm, sortOption]);

  return (
    <>
      <div className="bg-primary min-h-screen">
        {/* Page Header */}
        <section className="relative py-24 md:py-32 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/india-destinations-mountains/1920/1080')"}}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative container mx-auto px-6 text-center text-white">
              <AnimatedWrapper>
                  <h1 className="text-5xl md:text-6xl font-bold font-serif">Our Destinations</h1>
                  <p className="mt-4 text-xl max-w-2xl mx-auto text-light">
                      From sun-kissed beaches to ancient wonders, find the perfect destination for your next escape.
                  </p>
              </AnimatedWrapper>
          </div>
        </section>

        {/* Filter and Sort Controls */}
        <section className="container mx-auto px-6 pt-12 -mb-4">
            <AnimatedWrapper>
              <div className="bg-secondary p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="relative w-full md:w-1/2 lg:w-1/3">
                      <input
                          type="text"
                          placeholder="Search by name or country..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 pl-10 pr-4 text-light focus:outline-none focus:ring-2 focus:ring-highlight"
                          aria-label="Search destinations"
                      />
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent" />
                  </div>
                  <div className="relative w-full md:w-auto">
                      <select
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                          className="w-full md:w-auto appearance-none bg-accent/20 border border-accent/30 rounded-md py-3 pl-4 pr-10 text-light focus:outline-none focus:ring-2 focus:ring-highlight cursor-pointer"
                          aria-label="Sort destinations"
                      >
                          <option value="popularity">Sort by Popularity</option>
                          <option value="price_asc">Price: Low to High</option>
                          <option value="price_desc">Price: High to Low</option>
                          <option value="rating_desc">Rating: High to Low</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent pointer-events-none" />
                  </div>
              </div>
            </AnimatedWrapper>
        </section>

        {/* Destinations Grid */}
        <section className="container mx-auto px-6 py-16">
          {filteredAndSortedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedDestinations.map((dest, index) => (
                <AnimatedWrapper key={dest.id} delay={`${index * 100}ms`}>
                  <DestinationCard destination={dest} onCardClick={openModal} />
                </AnimatedWrapper>
              ))}
            </div>
          ) : (
            <AnimatedWrapper>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold font-serif text-light">No Destinations Found</h2>
                <p className="text-accent mt-2">Try adjusting your search or filters.</p>
              </div>
            </AnimatedWrapper>
          )}
        </section>
      </div>

      {selectedDestination && <DestinationModal destination={selectedDestination} onClose={closeModal} />}
    </>
  );
};

export default Destinations;
