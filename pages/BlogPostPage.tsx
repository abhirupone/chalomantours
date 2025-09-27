import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import AnimatedWrapper from '../components/AnimatedWrapper';
import { CalendarIcon } from '../components/Icons';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold font-serif text-light">Post Not Found</h1>
        <p className="text-accent mt-4">Sorry, we couldn't find the blog post you're looking for.</p>
        <Link to="/blog" className="mt-8 inline-block bg-highlight text-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-primary">
      {/* Header Image */}
      <header className="relative h-[50vh] min-h-[300px] max-h-[500px]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <AnimatedWrapper>
              <span className="bg-highlight text-primary font-bold px-3 py-1 rounded-md text-sm uppercase tracking-wider">{post.category}</span>
              <h1 className="text-4xl md:text-5xl font-bold font-serif mt-4 text-white">{post.title}</h1>
            </AnimatedWrapper>
          </div>
        </div>
      </header>
      
      {/* Post Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Meta Info */}
          <AnimatedWrapper>
            <div className="flex items-center gap-6 mb-8 text-light/80 border-b border-accent pb-4">
              <div className="flex items-center gap-3">
                <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-light">{post.author}</p>
                  <p className="text-sm text-accent">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-accent" />
                <span className="text-light">{post.date}</span>
              </div>
            </div>
          </AnimatedWrapper>

          {/* Article */}
          <AnimatedWrapper delay="150ms">
            <article className="space-y-6 text-lg leading-relaxed text-accent">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>
          </AnimatedWrapper>

          {/* Back Button */}
          <AnimatedWrapper delay="300ms">
            <div className="mt-16 border-t border-accent pt-8 text-center">
              <Link to="/blog" className="font-semibold text-highlight hover:underline text-lg">
                &larr; Back to All Posts
              </Link>
            </div>
          </AnimatedWrapper>
        </div>
      </main>
    </div>
  );
};

export default BlogPostPage;
