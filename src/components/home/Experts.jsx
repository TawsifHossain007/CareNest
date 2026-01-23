import React from 'react';

const expertsData = [
  {
    name: "Dr. Amina Rahman",
    role: "Clinical Psychologist",
    bio: "Provides compassionate therapy and guidance for individuals seeking emotional support."
  },
  {
    name: "Mr. Karim Hossain",
    role: "Mental Health Counselor",
    bio: "Helps clients manage stress, anxiety, and life transitions with care and understanding."
  },
  {
    name: "Ms. Farah Naz",
    role: "Child & Adolescent Therapist",
    bio: "Specializes in supporting young minds through counseling and therapeutic activities."
  },
  {
    name: "Dr. Sohail Ahmed",
    role: "Psychiatrist",
    bio: "Offers professional assessment and treatment plans for mental health conditions."
  }
];

const Experts = () => {
  return (
    <section className="py-20 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-6">Meet Our Experts</h2>
          <p className="text-neutral max-w-2xl mx-auto leading-relaxed">
            Our team of dedicated mental health professionals is here to guide and support you every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertsData.map((expert, index) => (
            <div key={index} className="bg-base-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
              <h3 className="text-xl font-semibold mb-2 text-secondary">{expert.name}</h3>
              <p className="text-primary font-medium mb-3">{expert.role}</p>
              <p className="text-neutral leading-relaxed">{expert.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experts;