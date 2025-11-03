import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedWrapper from '../components/AnimatedWrapper';
import CustomTourForm from '../components/CustomTourForm';

const CustomTour: React.FC = () => {
    return (
        <div className="min-h-screen bg-primary">
            {/* Page Header */}
            <section className="relative py-24 md:py-32 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/custom-india-journey/1920/1080')"}}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative container mx-auto px-6 text-center text-white">
                    <AnimatedWrapper>
                        <h1 className="text-5xl md:text-6xl font-bold font-serif">Custom India Tours</h1>
                        <p className="mt-4 text-xl max-w-2xl mx-auto text-light">
                            Your dream Indian adventure awaits. From Himalayan treks to Kerala backwaters, we'll craft your perfect journey through Incredible India.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/destinations" className="bg-highlight text-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors duration-300">
                                Browse Destinations
                            </Link>
                            <Link to="/contact" className="bg-secondary text-light font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors duration-300 border-2 border-accent">
                                Get in Touch
                            </Link>
                        </div>
                    </AnimatedWrapper>
                </div>
            </section>

            <CustomTourForm />
        </div>
    );
};

export default CustomTour;