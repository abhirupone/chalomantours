import type { NavLink, Destination, Testimonial, Stat, Service, HeroSlide, BlogPost, User } from './types';
import { WorldIcon, PlaneIcon, WalletIcon, StarIcon } from './components/Icons';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'Custom Tour', path: '/custom-tour' },
  { name: 'Special Offers', path: '/special-offers' },
  { name: 'Blog', path: '/blog' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const CURRENT_USER: User = {
  name: 'Alex Rider',
  email: 'alex.rider@example.com',
  avatar: 'https://picsum.photos/seed/user-avatar/200/200',
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/india-taj/1920/1080',
    title: 'Discover Incredible India',
    subtitle: 'With Chaloman Tours and Travels',
    description: 'Experience the vibrant culture, ancient heritage, and breathtaking landscapes of India. Your spiritual journey begins here.',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/india-kerala/1920/1080',
    title: 'From Himalayas to Backwaters',
    subtitle: 'Explore Diverse Wonders',
    description: 'Journey through snow-capped mountains, lush green valleys, and serene backwaters. Discover India\'s incredible diversity.',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/india-culture/1920/1080',
    title: 'Create Your Indian Odyssey',
    subtitle: 'Live Unforgettable Moments',
    description: 'We handle the details, so you can immerse yourself in India\'s rich traditions, festivals, and warm hospitality.',
  },
];

export const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: 'Golden Triangle',
    country: 'India',
    image: '/images/hjbknm,vbjmcgyhdm.jpeg',
    description: 'Experience the majestic Taj Mahal, ancient forts, and vibrant cities of Delhi, Agra, and Jaipur.',
    price: 45000,
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Kerala Backwaters',
    country: 'India',
    image: '/images/images.jpeg',
    description: 'Cruise through serene backwaters on traditional houseboats, surrounded by lush greenery and coconut palms.',
    price: 35000,
    originalPrice: 42000,
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Rajasthan Desert Safari',
    country: 'India',
    image: '/images/Untitled.jpeg',
    description: 'Stay in luxury desert camps, ride camels, and experience the royal heritage of Rajasthan.',
    price: 40000,
    rating: 5.0,
  },
  {
    id: 4,
    name: 'Himalayan Adventure',
    country: 'India',
    image: '/images/Kufri-Mountains-view-Cover-Photo-840x425.jpg',
    description: 'Trek through breathtaking Himalayan valleys, visit ancient monasteries, and experience mountain culture.',
    price: 55000,
    rating: 4.9,
  },
    {
    id: 5,
    name: 'Goa Beach Paradise',
    country: 'India',
    image: '/images/ASGOBEACHBEERTOUR-2.jpg',
    description: 'Relax on pristine beaches, explore Portuguese heritage, and enjoy vibrant nightlife in Goa.',
    price: 28000,
    originalPrice: 35000,
    rating: 4.7,
  },
  {
    id: 6,
    name: 'Spiritual Varanasi',
    country: 'India',
    image: '/images/zxbvfsgfs.jpeg',
    description: 'Witness ancient rituals along the Ganges, explore sacred temples, and experience India\'s spiritual heart.',
    price: 22000,
    rating: 4.9,
  },
  {
    id: 8,
    name: 'Eastern India Explorer: Vizag & Jagdalpur',
    country: 'India',
    image: '/images/reddstgf.jpeg',
    description: 'Discover the coastal beauty of Visakhapatnam and the tribal culture of Jagdalpur in this unique Eastern India adventure.',
    price: 22100,
    rating: 4.8,
  },
  {
    id: 11,
    name: 'Smart South India Circuit',
    country: 'India',
    image: '/images/dxbtgfjsyrf.jpeg',
    description: 'Explore South India\'s highlights from Chennai\'s temples to Madurai\'s heritage, Rameshwaram\'s pilgrimage, and Kanyakumari\'s tip.',
    price: 32300,
    rating: 4.8,
  },
  {
    id: 13,
    name: 'Darjeeling Offbeat Adventure',
    country: 'India',
    image: '/images/htdzgf.jpeg',
    description: 'Discover hidden gems around Darjeeling - misty mountains, tea plantations, and lesser-known trails for the adventurous traveler.',
    price: 13400,
    rating: 4.6,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'London, UK',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    comment: 'Chaloman Tours and Travels made our Golden Triangle journey unforgettable. From the Taj Mahal at sunrise to the palaces of Jaipur, every moment was magical. Their knowledge of Indian culture was exceptional!',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Singapore',
    avatar: 'https://picsum.photos/seed/rajesh/100/100',
    comment: 'As an Indian diaspora, I wanted authentic experiences. Chaloman Tours and Travels delivered beyond expectations - from village homestays to spiritual retreats. Truly connected me with my roots.',
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    location: 'Barcelona, Spain',
    avatar: 'https://picsum.photos/seed/maria/100/100',
    comment: 'The Kerala backwaters houseboat experience was pure bliss. Chaloman Tours and Travels arranged everything perfectly - from Ayurvedic treatments to local village visits. India stole our hearts!',
  },
];

export const STATS: Stat[] = [
    { value: 10, label: 'Years in India Tourism', suffix: '+' },
    { value: 29, label: 'Indian States Covered', suffix: '+' },
    { value: 25, label: 'Happy Travelers', suffix: 'k+' },
    { value: 98, label: 'Positive Reviews', suffix: '%' },
];

export const SERVICES: Service[] = [
  {
    icon: WorldIcon,
    title: 'Authentic India Experiences',
    description: 'We craft personalized journeys that immerse you in India\'s rich culture, festivals, and traditions.',
  },
  {
    icon: PlaneIcon,
    title: 'Seamless Travel Across India',
    description: 'From domestic flights to train journeys, we handle all logistics for stress-free exploration.',
  },
  {
    icon: WalletIcon,
    title: 'Best Value for Indian Adventures',
    description: 'Competitive pricing for luxury experiences, cultural tours, and spiritual retreats.',
  },
  {
    icon: StarIcon,
    title: 'Expert Local Guides',
    description: 'Our knowledgeable guides provide authentic insights into India\'s history, culture, and spirituality.',
  }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        slug: '10-must-try-foods-in-india',
        title: '10 Must-Try Foods Across Incredible India',
        category: 'Food & Culture',
        image: 'https://picsum.photos/seed/indian-food/800/600',
        author: 'Priya Patel',
        authorAvatar: 'https://picsum.photos/seed/priya-author/100/100',
        date: 'October 26, 2023',
        excerpt: 'From butter chicken in Delhi to appam in Kerala, discover the diverse culinary delights that make India a food lover\'s paradise.',
        content: 'India\'s culinary landscape is as diverse as its culture. Each region offers unique flavors, spices, and cooking techniques that reflect local traditions and ingredients.\n\nButter Chicken from Delhi is a rich, creamy curry that has become India\'s most famous export to the world of cuisine. The tender chicken pieces simmered in a tomato-based sauce with cream and aromatic spices create a dish that\'s both comforting and exotic.\n\nDosa from South India is a crispy, paper-thin crepe made from fermented rice and lentil batter. Served with coconut chutney and sambar, it\'s a perfect breakfast or snack that\'s both nutritious and delicious.'
    },
    {
        id: 2,
        slug: 'spiritual-journeys-in-india',
        title: 'Spiritual Journeys: From Varanasi to the Himalayas',
        category: 'Spirituality',
        image: 'https://picsum.photos/seed/india-spiritual/800/600',
        author: 'Swami Anand',
        authorAvatar: 'https://picsum.photos/seed/swami/100/100',
        date: 'October 22, 2023',
        excerpt: 'Discover India\'s sacred sites, from the ghats of Varanasi to ancient Himalayan monasteries. A guide to spiritual tourism in the land of enlightenment.',
        content: 'India has been a spiritual destination for seekers from around the world for millennia. The country\'s sacred geography offers profound experiences for those on a spiritual journey.\n\nVaranasi, the world\'s oldest living city, is where you can witness the cycle of life and death along the sacred Ganges River. The evening Ganga Aarti ceremony is a mesmerizing display of devotion and spirituality.\n\nThe Himalayas offer another dimension of spiritual exploration. Ancient monasteries, meditation caves, and sacred lakes provide serene environments for introspection and spiritual practice.'
    },
    {
        id: 3,
        slug: 'festival-travel-guide-india',
        title: 'Festival Travel Guide: Experience India\'s Vibrant Celebrations',
        category: 'Festivals',
        image: 'https://picsum.photos/seed/india-festivals/800/600',
        author: 'Dr. Maya Singh',
        authorAvatar: 'https://picsum.photos/seed/maya/100/100',
        date: 'October 15, 2023',
        excerpt: 'From Holi\'s colorful celebrations to Diwali\'s festival of lights, learn how to experience India\'s festivals authentically and respectfully.',
        content: 'India\'s festivals are vibrant expressions of its cultural diversity and spiritual depth. Each celebration offers a unique opportunity to connect with local communities and traditions.\n\nHoli, the festival of colors, transforms cities into rainbow wonderlands. The throwing of colored powders symbolizes the triumph of good over evil and the arrival of spring.\n\nDiwali, the festival of lights, illuminates homes and hearts across the nation. The lighting of lamps symbolizes the victory of light over darkness and knowledge over ignorance.'
    }
];