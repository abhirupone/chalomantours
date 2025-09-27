import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DESTINATIONS, TESTIMONIALS, SERVICES, HERO_SLIDES } from '../constants';
import DestinationCard from '../components/DestinationCard';
import TestimonialCard from '../components/TestimonialCard';
import AnimatedWrapper from '../components/AnimatedWrapper';
import AITripPlanner from '../components/AITripPlanner';
import DestinationModal from '../components/DestinationModal';
import type { Service, Destination } from '../types';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="bg-secondary p-6 rounded-lg text-center shadow-lg h-full flex flex-col">
        <service.icon className="h-12 w-12 mx-auto text-highlight mb-4" />
        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
        <p className="text-accent mb-6 flex-grow">{service.description}</p>
        <Link
            to="/contact"
            className="bg-highlight text-primary font-bold py-2 px-4 rounded-lg text-sm hover:bg-opacity-80 transition-colors duration-300 mt-auto"
        >
            Learn More
        </Link>
    </div>
);

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 7000); // Auto-scroll every 7 seconds

    return () => clearInterval(slideInterval);
  }, []);

  const activeSlide = HERO_SLIDES[currentSlide];

  const openModal = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const closeModal = () => {
    setSelectedDestination(null);
  };

  return (
    <>
      <div className="space-y-24 md:space-y-32">
        {/* Hero Section */}
        <section className="relative h-screen -mt-20 flex items-center justify-center text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="absolute inset-0">
              {HERO_SLIDES.map((slide, index) => (
                  <div
                      key={slide.id}
                      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  >
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover animate-hero-zoom"/>
                  </div>
              ))}
          </div>
          <div className="relative z-20 px-4">
            <AnimatedWrapper key={currentSlide}>
              <h1 className="text-5xl md:text-7xl font-extrabold font-serif mb-4 leading-tight">{activeSlide.title}</h1>
              <h2 className="text-3xl md:text-5xl font-serif text-highlight mb-8">{activeSlide.subtitle}</h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
                {activeSlide.description}
              </p>
              <Link to="/destinations" className="bg-highlight text-primary font-bold py-4 px-10 rounded-lg text-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
                Discover Tours
              </Link>
            </AnimatedWrapper>
          </div>
          
          {/* Carousel Navigation Dots */}
          <div className="absolute z-30 bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
              {HERO_SLIDES.map((_, index) => (
                  <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-highlight scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                  aria-label={`Go to slide ${index + 1}`}
                  />
              ))}
          </div>
        </section>

        {/* Featured Destinations */}
        <section id="destinations" className="container mx-auto px-6">
          <AnimatedWrapper>
            <h2 className="text-4xl font-bold font-serif text-center mb-4">Featured Destinations</h2>
            <p className="text-xl text-accent text-center max-w-3xl mx-auto mb-12">
              Discover India's incredible diversity - from the majestic Taj Mahal to serene Kerala backwaters. Your Indian adventure awaits.
            </p>
          </AnimatedWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.slice(0, 3).map((dest, index) => (
              <AnimatedWrapper key={dest.id} delay={`${index * 150}ms`}>
                <DestinationCard destination={dest} onCardClick={openModal} />
              </AnimatedWrapper>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-6">
            <AnimatedWrapper>
              <h2 className="text-4xl font-bold font-serif text-center mb-4">Why Travel With Us?</h2>
              <p className="text-xl text-accent text-center max-w-3xl mx-auto mb-12">
                We promise to provide you with an experience that is authentic, seamless, and absolutely unforgettable.
              </p>
            </AnimatedWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service, index) => (
                <AnimatedWrapper key={service.title} delay={`${index * 150}ms`}>
                  <ServiceCard service={service} />
                </AnimatedWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* AI Trip Planner */}
        <AITripPlanner onCardClick={openModal} />

        {/* Testimonials */}
        <section className="container mx-auto px-6">
          <AnimatedWrapper>
            <h2 className="text-4xl font-bold font-serif text-center mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-accent text-center max-w-3xl mx-auto mb-12">
              Real stories from adventurers who have explored the world with us.
            </p>
          </AnimatedWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <AnimatedWrapper key={testimonial.id} delay={`${index * 150}ms`}>
                <TestimonialCard testimonial={testimonial} />
              </AnimatedWrapper>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-24 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://picsum.photos/seed/cta-bg/1920/1080')"}}>
          <div className="absolute inset-0 bg-primary/70"></div>
          <div className="relative container mx-auto px-6 text-center">
              <AnimatedWrapper>
                  <h2 className="text-4xl font-bold font-serif mb-4">Ready for Your Next Adventure?</h2>
                  <p className="text-xl text-light max-w-3xl mx-auto mb-8">
                      Don't wait. The world is out there, and we're here to help you explore it. Contact us today to plan your dream trip.
                  </p>
                  <Link to="/contact" className="bg-highlight text-primary font-bold py-4 px-10 rounded-lg text-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
                      Get in Touch
                  </Link>
              </AnimatedWrapper>
          </div>
        </section>
      </div>
      
      {selectedDestination && <DestinationModal destination={selectedDestination} onClose={closeModal} />}
    </>
  );
};

export default Home;
