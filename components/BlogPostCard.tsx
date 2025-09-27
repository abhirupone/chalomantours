import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';
import { CalendarIcon } from './Icons';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-secondary rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
      <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden h-60" aria-label={`Read more about ${post.title}`}>
        <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <span className="absolute top-4 left-4 bg-highlight text-primary font-bold px-3 py-1 rounded-md text-xs uppercase tracking-wider">{post.category}</span>
      </Link>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold font-serif text-light mb-3">
            <Link to={`/blog/${post.slug}`} className="group-hover:text-highlight transition-colors duration-300">{post.title}</Link>
        </h3>
        
        <div className="flex items-center gap-4 text-accent text-sm mb-4">
            <div className="flex items-center gap-2">
                <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full" />
                <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>{post.date}</span>
            </div>
        </div>

        <p className="text-accent text-md leading-relaxed flex-grow mb-4">{post.excerpt}</p>
        
        <Link to={`/blog/${post.slug}`} className="font-semibold text-highlight hover:underline mt-auto self-start">
            Read More &rarr;
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;