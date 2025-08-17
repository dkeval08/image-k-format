import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = ({ stats, scrollToSection }) => (
  <section id="hero" className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
          Transform Your
          <motion.span
            className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Images
          </motion.span>
        </h1>
        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Professional image processing powered by AI. Optimize, enhance, and
          transform your images with cutting-edge technology in seconds.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-16"
      >
        <motion.button
          onClick={() => scrollToSection("editor")}
          className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Creating
          <ArrowRight className="inline-block ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl" />
        <div className="relative bg-white/10  rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-blue-300 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
