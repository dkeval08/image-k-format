import React from "react";
import { motion } from "framer-motion";
import { Image } from "lucide-react";

const FooterSection = () => (
  <footer className="py-16 px-6 border-t border-white/20 relative z-10">
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <motion.div className="flex items-center justify-center space-x-3 mb-8 ">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-xl">
              <Image className="w-7 h-7 text-white" />
            </div>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-br from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            imageKFormat
          </span>
        </motion.div>
        <p className="text-blue-100 mb-8 text-lg">
          Transform your images with the power of AI
        </p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
