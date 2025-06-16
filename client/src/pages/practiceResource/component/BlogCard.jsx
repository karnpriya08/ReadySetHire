import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <main className="m-2 p-4 bg-cyan-800 rounded  shadow">
      <h1 className="text-xl font-bold my-1">{blog.title}</h1>
      <p className="text-sm">{blog.content}</p>
      <p className="text-sm italic mt-2">Category: {blog.category}</p>
      <p className="text-sm italic">Date: {new Date(blog.date).toLocaleDateString()}</p>
    </main>
  );
};

export default BlogCard;