import React from 'react';
import { BLOG_POSTS } from '../constants';
import BlogPostCard from '../components/BlogPostCard';
import AnimatedWrapper from '../components/AnimatedWrapper';

const Blog: React.FC = () => {
  return (
    <>
      <div className="bg-primary min-h-screen">
        {/* Page Header */}
        <section className="relative py-24 md:py-32 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/blog-header/1920/1080')"}}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative container mx-auto px-6 text-center text-white">
              <AnimatedWrapper>
                  <h1 className="text-5xl md:text-6xl font-bold font-serif">Travel Blog</h1>
                  <p className="mt-4 text-xl max-w-2xl mx-auto text-light">
                      Inspiration, tips, and stories from our adventures around the world.
                  </p>
              </AnimatedWrapper>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, index) => (
              <AnimatedWrapper key={post.id} delay={`${index * 100}ms`}>
                <BlogPostCard post={post} />
              </AnimatedWrapper>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;