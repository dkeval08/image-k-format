import React from "react";
import { motion } from "framer-motion";
import { Image } from "lucide-react";

const NavigationBar = ({ scrollToSection }) => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className="fixed top-0 w-full z-50 bg-blue-600  border-b border-white/20"
  >
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-xl">
              <Image className="w-6 h-6 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl opacity-30 blur-sm"
            />
          </div>
          <span className="text-2xl font-bold text-white">imageKFormat</span>
        </motion.div>
        <div className="hidden md:flex space-x-8">
          {["Hero", "Features", "Editor", "Stats", "About"].map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  </motion.nav>
);

export default NavigationBar;
