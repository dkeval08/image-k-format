import React from "react";
import "../features.css"; // custom css file

const FeaturesSection = ({ features }) => (
  <section id="features" className="py-20 px-6 relative z-10">
    <div className="mx-auto">
      {/* Header Animation */}
      <div className="text-center mb-16 fade-up">
        <h2 className="text-5xl font-bold text-white mb-6">
          Powerful Features
        </h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
          Everything you need to create, enhance, and optimize images with
          professional results
        </p>
      </div>

      {/* Grid with fade-up for items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white/10 rounded-2xl p-8 border border-white/20 hover:bg-white/20 
                       transition-all duration-300 feature-card fade-up"
            style={{ animationDelay: `${index * 0.2}s` }} // staggered
          >
            <div className="text-blue-300 mb-4 group-hover:text-blue-200 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-blue-100 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
