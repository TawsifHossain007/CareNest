import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Mother",
      comment:
        "CareNest provided an amazing babysitter for my little one. I feel confident knowing my child is in safe hands!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Michael Brown",
      role: "Son",
      comment:
        "The elderly care service is exceptional. My father is comfortable and well taken care of every day.",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Daughter",
      comment:
        "The caregivers for my sick mother are very professional and compassionate. Highly recommended!",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <section className=" py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Testimonials</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear what our satisfied clients have to say about our caregiving services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <div className="flex justify-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-600"
              />
            </div>
            <p className="text-gray-600 italic mb-4 text-center">"{testimonial.comment}"</p>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              {testimonial.name}
            </h3>
            <p className="text-gray-500 text-center">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
