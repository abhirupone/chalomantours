
import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-secondary p-8 rounded-lg shadow-lg h-full flex flex-col">
      <p className="text-accent italic flex-grow">"{testimonial.comment}"</p>
      <div className="mt-6 flex items-center">
        <img src={testimonial.avatar} alt={testimonial.name} className="h-14 w-14 rounded-full object-cover" />
        <div className="ml-4">
          <p className="font-bold text-lg text-light">{testimonial.name}</p>
          <p className="text-sm text-highlight">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
