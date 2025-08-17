import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FooterSection = () => (
  <footer className="py-16 px-6 border-t border-white/20 relative z-10">
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <motion.div
          className="flex items-center justify-center space-x-3 mb-8"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-xl">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl opacity-30 blur-sm"
            />
          </div>
          <span className="text-3xl font-bold text-white">imageKFormat</span>
        </motion.div>
        <p className="text-blue-100 mb-8 text-lg">
          Transform your images with the power of AI
        </p>
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="#"
            className="text-blue-100 hover:text-white transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-blue-100 hover:text-white transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-blue-100 hover:text-white transition-colors"
          >
            Support
          </a>
          <a
            href="#"
            className="text-blue-100 hover:text-white transition-colors"
          >
            API
          </a>
        </div>
        <div className="text-blue-200 text-sm">
          © 2024 imageKFormat. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
