import React from "react";
import { motion } from "framer-motion";

const FeaturesSection = ({ features, containerVariants, itemVariants }) => (
  <section id="features" className="py-20 px-6 relative z-10">
    <div className=" mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-white mb-6">
          Powerful Features
        </h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
          Everything you need to create, enhance, and optimize images with
          professional results
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ y: -10, scale: 1.02 }}
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;
