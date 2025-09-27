export interface NavLink {
  name: string;
  path: string;
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  originalPrice?: number;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  comment: string;
}

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export interface Service {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface SuggestedDestination {
  destination: Destination;
  reason: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface BookingDetails {
  name: string;
  email: string;
  startDate: string;
  endDate: string;
}
