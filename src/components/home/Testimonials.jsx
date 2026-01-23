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
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-6">What Our Clients Say</h2>
          <p className="text-neutral max-w-2xl mx-auto leading-relaxed">
            Hear what our satisfied clients have to say about our caregiving services and the peace of mind we provide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-base-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300"
            >
              <div className="flex justify-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-primary"
                />
              </div>
              <p className="text-neutral italic mb-6 text-center leading-relaxed">
                "{testimonial.comment}"
              </p>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-secondary mb-1">
                  {testimonial.name}
                </h3>
                <p className="text-primary font-medium">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;