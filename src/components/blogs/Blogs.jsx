import { getBlogs } from '@/actions/server/Blogs';
import Link from 'next/link';
import React from 'react';

const Blogs = async() => {
    const blogs = await getBlogs()
    return (
        <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Care & Wellness Insights
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Trusted advice, caregiving tips, and insights to help you take better
          care of your loved ones.
        </p>
      </section>

      {/* Featured Blog */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 mb-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="md:w-1/2 h-72 md:h-auto object-cover"
          />
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <span className="text-primary font-semibold mb-2">
              Featured Article
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {blogs[0].title}
            </h2>
            <p className="text-gray-600 mb-6">
              {blogs[0].description}
            </p>
            <div className="text-sm text-gray-500 mb-6">
              By {blogs[0].author} • {blogs[0].date}
            </div>
            <Link href={`/blogs/${blogs[0]._id}`} className="btn btn-primary w-fit">
              Read Full Article
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Latest Articles
        </h3>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogs.slice(1).map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6 flex flex-col grow">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  {blog.title}
                </h4>
                <p className="text-gray-600 mb-4 grow">
                  {blog.description}
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  By {blog.author} • {blog.date}
                </div>
                <Link href={`/blogs/${blog._id}`} className="btn btn-outline btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Need Trusted Care Services?
        </h2>
        <p className="max-w-xl mx-auto mb-6 opacity-90">
          Find reliable babysitters and elderly caregivers easily with Care.IO.
        </p>
        <button className="btn btn-secondary">
          Book a Caregiver
        </button>
      </section>
    </div>
    );
};

export default Blogs;