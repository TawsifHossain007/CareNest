import { getSingleBlog, getSingleService } from "@/actions/server/Blogs";
import React from "react";
import { notFound } from "next/navigation";

const BlogDetails = async ({ params }) => {
  const { id } = await params;

  const blog = await getSingleBlog(id);

  if (!blog) {
    return notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {blog.title}
          </h1>
          <p className="opacity-90 text-sm md:text-base">
            By {blog.author} • {blog.date}
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="max-w-4xl mx-auto px-6 -mt-16 pb-24">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image */}
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-80 object-cover"
          />

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Short Description */}
            <p className="text-lg font-medium text-gray-700 mb-6">
              {blog.description}
            </p>

            {/* Long Description */}
            <div className="space-y-5 text-gray-700 leading-relaxed">
              {blog.longDescription
                ?.split(". ")
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}.</p>
                ))}
            </div>

            {/* Divider */}
            <div className="border-t mt-12 pt-8 flex items-center justify-between flex-wrap gap-4">
              <span className="text-sm text-gray-500">
                Published on {blog.date}
              </span>

              <span className="text-sm font-medium text-primary">
                Care.IO • Trusted Care Solutions
              </span>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-primary/10 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Need Trusted Care Services?
              </h3>
              <p className="text-gray-600 mb-5 max-w-xl mx-auto">
                Care.IO connects you with verified caregivers for babysitting,
                elderly care, and personalized home assistance.
              </p>
              <button className="btn btn-primary">
                Book a Caregiver
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default BlogDetails;
