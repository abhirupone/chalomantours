
import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import type { ReactNode } from 'react';

interface AnimatedWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: string;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children, className = '', delay = '0s' }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    rootMargin: '0px',
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

export default AnimatedWrapper;
