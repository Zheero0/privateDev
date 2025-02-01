import React from "react";

const testimonials = [
    {
        name: "Mathew Conway",
        role: "Product Designer",
        review:
            "This site has completely transformed my workflow. The real-time color updates are a game-changer!",
        rating: 5,
        avatarColor: "bg-green-500",
    },
    {
        name: "Alisson Becker",
        role: "Creative Director",
        review:
            "I was able to find the perfect color palette for my project in minutes. Highly recommend!",
        rating: 5,
        avatarColor: "bg-gray-400",
    },
    {
        name: "Sanjay Ravel",
        role: "Developer",
        review:
            "As a developer, I appreciate the simplicity and efficiency of this tool. It's a must-have for any project.",
        rating: 5,
        avatarColor: "bg-green-400",
    },
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">Testimonials</h2>
        <p className="text-gray-600 mt-2">
          What our users think of our app.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto px-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <div
              className={`w-16 h-16 rounded-full ${testimonial.avatarColor} mb-4`}
            ></div>
            <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
            <p className="text-gray-500 text-sm">{testimonial.role}</p>

            {/* Star Ratings */}
            <div className="mt-2 flex">
              {Array(testimonial.rating)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-green-500 text-lg">
                    ★
                  </span>
                ))}
            </div>

            {/* Review */}
            <p className="text-gray-700 mt-3 text-sm italic">
              {testimonial.review}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
