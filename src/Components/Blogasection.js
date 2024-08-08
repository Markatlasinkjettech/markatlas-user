import React from 'react';
import './BlogSection.css';

// Blog Post Component
const BlogPost = ({ title, description, image, index }) => (
  <div className="blog-post animate-fadeIn" style={{ animationDelay: `${0.4 + index * 0.2}s` }}>
    <div className="blog-image" style={{ backgroundImage: `url(${image})` }}></div>
    <div className="blog-content">
      <h3 className="blog-title">{title}</h3>
      <p className="blog-description">{description}</p>
    </div>
  </div>
);

// Blog Section Component
const BlogSection = () => {
  const posts = [
    {
      title: "Blog Title 1",
      description: "Short description of the blog post...",
      image: "https://via.placeholder.com/300x200" // Replace with actual image URLs
    },
    {
      title: "Blog Title 2",
      description: "Short description of the blog post...",
      image: "https://via.placeholder.com/300x200" // Replace with actual image URLs
    },
    {
      title: "Blog Title 3",
      description: "Short description of the blog post...",
      image: "https://via.placeholder.com/300x200" // Replace with actual image URLs
    }
  ];

  return (
    <section className="blog-section p-12">
      <h2 className="text-3xl font-bold mb-8 animate-fadeIn">Blog</h2>
      <p className="mb-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        Laborum dolore aure et incididunt aute eiusmod magna.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <BlogPost
            key={i}
            title={post.title}
            description={post.description}
            image={post.image}
            index={i}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
