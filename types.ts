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
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  signup: (credentials: SignupCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export interface BookingDetails {
  name: string;
  email: string;
  startDate: string;
  endDate: string;
}
