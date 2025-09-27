
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import AnimatedWrapper from '../components/AnimatedWrapper';
import { STATS } from '../constants';
import type { Stat } from '../types';

const AnimatedCounter: React.FC<{ stat: Stat }> = ({ stat }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver<HTMLSpanElement>({ threshold: 0.5 });

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = stat.value;
      if (start === end) return;
      
      const duration = 1500;
      const incrementTime = (duration / end);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isVisible, stat.value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-highlight">
      {count}{stat.suffix}
    </span>
  );
};


const About: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Page Header */}
       <section className="relative py-24 md:py-32 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/about-header/1920/1080')"}}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-6 text-center text-white">
            <AnimatedWrapper>
                <h1 className="text-5xl md:text-6xl font-bold font-serif">About Chaloman Tours</h1>
                <p className="mt-4 text-xl max-w-2xl mx-auto text-light">
                    We are passionate about showcasing India's incredible diversity, from ancient temples to modern cities, creating authentic experiences that connect you with India's rich heritage.
                </p>
            </AnimatedWrapper>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedWrapper>
            <img src="https://picsum.photos/seed/about-story/800/600" alt="Team of travelers" className="rounded-lg shadow-2xl" />
          </AnimatedWrapper>
          <AnimatedWrapper delay="200ms">
            <h2 className="text-3xl font-bold font-serif mb-4">Our Story</h2>
            <p className="text-accent mb-4 leading-relaxed">
              Founded in 2014 by travel enthusiasts with deep roots in India's diverse cultures, Chaloman Tours was born from a passion to share India's incredible heritage. We believed that experiencing India should be transformative - connecting travelers with ancient traditions, vibrant festivals, and the warmth of Indian hospitality.
            </p>
            <p className="text-accent leading-relaxed">
              From our humble beginnings in Mumbai, we've grown into India's leading bespoke travel company, specializing in authentic experiences across the subcontinent. Our local expertise and deep cultural understanding ensure every journey tells the true story of Incredible India.
            </p>
          </AnimatedWrapper>
        </div>
      </section>
      
       {/* Stats Section */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, index) => (
              <AnimatedWrapper key={index}>
                <div className="p-4">
                  <AnimatedCounter stat={stat} />
                  <p className="mt-2 text-lg text-accent">{stat.label}</p>
                </div>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
       <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <AnimatedWrapper delay="200ms" className="lg:order-2">
            <img src="https://picsum.photos/seed/about-mission/800/600" alt="Compass" className="rounded-lg shadow-2xl" />
          </AnimatedWrapper>
          <AnimatedWrapper className="lg:order-1">
            <h2 className="text-3xl font-bold font-serif mb-4">Our Mission</h2>
            <p className="text-accent mb-4 leading-relaxed">
              Our mission is to showcase India's incredible diversity and cultural richness to the world. We strive to provide exceptional, authentic experiences that connect travelers with India's ancient heritage, vibrant traditions, and warm hospitality.
            </p>
            <ul className="text-accent space-y-2 list-disc list-inside">
                <li>To create personalized journeys through India's diverse landscapes and cultures.</li>
                <li>To promote responsible tourism that benefits local communities.</li>
                <li>To connect travelers with authentic Indian experiences and traditions.</li>
                <li>To ensure every guest experiences the true warmth of Indian hospitality.</li>
            </ul>
          </AnimatedWrapper>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/about-cta/1920/1080')"}}>
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="relative container mx-auto px-6 text-center">
          <AnimatedWrapper>
            <h2 className="text-4xl font-bold font-serif mb-4 text-light">Ready to Discover India?</h2>
            <p className="text-xl text-accent max-w-3xl mx-auto mb-8">
              Let us help you create unforgettable memories across Incredible India. Contact us today to plan your perfect Indian adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-highlight text-primary font-bold py-4 px-8 rounded-lg text-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
                Contact Us
              </Link>
              <Link to="/custom-tour" className="bg-secondary text-light font-bold py-4 px-8 rounded-lg text-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 border-2 border-accent">
                Plan Custom Tour
              </Link>
            </div>
          </AnimatedWrapper>
        </div>
      </section>
    </div>
  );
};

export default About;
