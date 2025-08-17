import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Image } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = ({ stats, scrollToSection }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
      },
    },
  };

  // Lottie placeholder component (replace with actual Lottie component)
  const LottieAnimation = () => (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Animated background circles */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-42 h-42 bg-blue-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-34 h-34 bg-indigo-400/30 rounded-full blur-lg"
          animate={{
            scale: [1.2, 1, 1.2],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-purple-400/25 rounded-full blur-md"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main animated icon */}
      <motion.div
        className="relative z-10"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="w-58 h-58 bg-gradient-to-br from-blue-400 to-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Image className="w-28 h-28 text-white" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/60 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  return (
    <section id="hero" className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Hero Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 my-16 mb-16 md:mb-38">
          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-left lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Transform Your
              <motion.span
                className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  textShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 40px rgba(99, 102, 241, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Images
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed"
            >
              Professional image processing powered by AI. Optimize, enhance,
              and transform your images with cutting-edge technology in seconds.
            </motion.p>

            <motion.div variants={buttonVariants}>
              <motion.button
                onClick={() => scrollToSection("editor")}
                className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Start Creating
                <motion.div
                  className="inline-block ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "backOut" }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Replace this with your actual Lottie component */}
              <LottieAnimation />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10 scale-150" />
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl" />
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.2 + index * 0.1,
                    ease: "backOut",
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className="text-center group cursor-pointer"
                >
                  <motion.div
                    className="text-blue-300 mb-2 flex justify-center"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-3xl font-bold text-white mb-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-blue-200 text-sm group-hover:text-blue-100 transition-colors duration-200">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
