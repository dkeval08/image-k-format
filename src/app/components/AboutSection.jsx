import React from "react";
import { motion } from "framer-motion";
import { Upload, Wand2, Zap, Download, Sparkles } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-20 px-6 relative z-10">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-8">
            The Future of
            <span className="block text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">
              Image Processing
            </span>
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            imageKFormat combines cutting-edge AI technology with intuitive
            design to deliver professional-grade image processing tools that
            anyone can use. Our platform processes over 10 million images
            monthly, helping creators and businesses optimize their visual
            content.
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-blue-100">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              Advanced AI-powered image optimization
            </div>
            <div className="flex items-center text-blue-100">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              Support for 50+ image formats
            </div>
            <div className="flex items-center text-blue-100">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              Enterprise-grade security and privacy
            </div>
            <div className="flex items-center text-blue-100">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              99.9% uptime guarantee
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative bg-white/10  rounded-3xl p-8 border border-white/20">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-center">
                <Upload className="w-8 h-8 text-white mx-auto mb-3" />
                <div className="text-white font-semibold">Upload</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-center">
                <Wand2 className="w-8 h-8 text-white mx-auto mb-3" />
                <div className="text-white font-semibold">Transform</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-center">
                <Zap className="w-8 h-8 text-white mx-auto mb-3" />
                <div className="text-white font-semibold">Optimize</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-center">
                <Download className="w-8 h-8 text-white mx-auto mb-3" />
                <div className="text-white font-semibold">Download</div>
              </div>
            </div>
          </div>
          {/* Floating elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 w-16 h-16 bg-blue-400 rounded-full opacity-20 blur-xl"
          />
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 w-20 h-20 bg-indigo-400 rounded-full opacity-20 blur-xl"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
