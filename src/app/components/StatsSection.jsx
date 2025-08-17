import React from "react";
import { motion } from "framer-motion";

const StatsSection = ({ stats }) => (
  <section id="stats" className="py-20 px-6 relative z-10">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-white mb-6">
          Trusted by Millions
        </h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
          Join the community of creators, designers, and businesses who trust
          imageKFormat
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats?.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center bg-white/10  rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="text-blue-300 mb-4 flex justify-center">
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {stat.number}
            </div>
            <div className="text-blue-200">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
