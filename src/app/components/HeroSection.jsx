import React, { useEffect, useState } from "react";
import { ArrowRight, Image, Users, Zap, Shield, Star } from "lucide-react";

const HeroSection = ({ scrollToSection }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sample stats data
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      number: "50K+",
      label: "Active Users",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      number: "1M+",
      label: "Images Processed",
    },
    { icon: <Shield className="w-6 h-6" />, number: "99.9%", label: "Uptime" },
    { icon: <Star className="w-6 h-6" />, number: "4.9", label: "User Rating" },
  ];

  // CSS animations using styled components approach with Tailwind
  const animations = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { 
        transform: scale(1);
        opacity: 0.2;
      }
      50% { 
        transform: scale(1.2);
        opacity: 0.3;
      }
    }
    
    @keyframes slide-in-left {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slide-in-right {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slide-in-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes gradient-shift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes arrow-bounce {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(5px); }
    }
    
    .float-animation {
      animation: float 6s ease-in-out infinite;
    }
    
    .rotate-slow {
      animation: rotate 20s linear infinite;
    }
    
    .pulse-glow-1 {
      animation: pulse-glow 4s ease-in-out infinite;
    }
    
    .pulse-glow-2 {
      animation: pulse-glow 3s ease-in-out infinite 1s;
    }
    
    .pulse-glow-3 {
      animation: pulse-glow 2.5s ease-in-out infinite 2s;
    }
    
    .slide-in-left {
      animation: slide-in-left 0.8s ease-out forwards;
    }
    
    .slide-in-right {
      animation: slide-in-right 1s ease-out 0.4s forwards;
    }
    
    .slide-in-up {
      animation: slide-in-up 1s ease-out forwards;
    }
    
    .gradient-animate {
      background-size: 200% 200%;
      animation: gradient-shift 3s ease-in-out infinite;
    }
    
    .arrow-bounce {
      animation: arrow-bounce 2s ease-in-out infinite;
    }
    
    .stagger-1 { animation-delay: 0.2s; }
    .stagger-2 { animation-delay: 0.4s; }
    .stagger-3 { animation-delay: 0.6s; }
    .stagger-4 { animation-delay: 0.8s; }
  `;

  const EnhancedAnimation = () => (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Animated background circles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl pulse-glow-1" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-indigo-400/30 rounded-full blur-lg pulse-glow-2" />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-purple-400/25 rounded-full blur-md pulse-glow-3" />
      </div>

      {/* Main animated icon */}
      <div className="relative z-10 float-animation">
        <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-indigo-500  rounded-3xl flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 group">
          <div className="rotate-slow">
            <Image className="w-24 h-24 text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{animations}</style>
      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Hero Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
            {/* Left Side - Text Content */}
            <div
              className={`flex-1 text-center lg:text-left ${
                isVisible ? "slide-in-left" : "opacity-0"
              }`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent gradient-animate mt-2">
                  Images
                </span>
              </h1>

              <p className="text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Professional image processing powered by AI. Optimize, enhance,
                and transform your images with cutting-edge technology in
                seconds.
              </p>

              <button
                onClick={() => scrollToSection("editor")}
                className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-3"
              >
                Start Creating
                <div className="arrow-bounce">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </div>

            {/* Right Side - Enhanced Animation */}
            <div
              className={`flex-1 flex justify-center lg:justify-end ${
                isVisible ? "slide-in-right" : "opacity-0"
              }`}
            >
              <div className="relative">
                <EnhancedAnimation />
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pulse-glow-1 -z-10 scale-150" />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div
            className={`relative max-w-4xl mx-auto ${
              isVisible ? "slide-in-up" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl pulse-glow-2" />
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center group cursor-pointer hover:scale-105 hover:-translate-y-2 transition-all duration-300 slide-in-up stagger-${
                      index + 1
                    }`}
                  >
                    <div className="text-blue-300 mb-2 flex justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-200">
                      {stat.icon}
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-200">
                      {stat.number}
                    </div>
                    <div className="text-blue-200 text-sm group-hover:text-blue-100 transition-colors duration-200">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
