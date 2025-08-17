"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  Loader2,
  ImageIcon,
  Settings,
  Zap,
  Palette,
  Crop,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  Award,
  ChevronDown,
  Play,
  Layers,
  Wand2,
  Filter,
} from "lucide-react";

const ImageModifier = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [transformedImage, setTransformedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [currentSection, setCurrentSection] = useState("hero");
  const [transformations, setTransformations] = useState({
    format: "",
    quality: "auto",
    width: "",
    height: "",
    crop: "fill",
    enhance: false,
    brightness: 0,
    contrast: 0,
    saturation: 0,
    blur: 0,
    sharpen: 0,
  });

  // Backend URL - Update this to match your backend
  const API_BASE_URL = "http://localhost:8000/api/media";

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedImage(response.data);
      setActiveTab("edit");
      setCurrentSection("editor");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
    },
    multiple: false,
  });

  const handleTransform = async () => {
    if (!uploadedImage) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/transform`, {
        public_id: uploadedImage.public_id,
        transformations,
      });

      setTransformedImage(response.data);
    } catch (error) {
      console.error("Transform error:", error);
      alert("Failed to transform image");
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!uploadedImage) return;
    console.log(uploadedImage);
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/optimize`, {
        public_id: uploadedImage.public_id,
      });

      setTransformedImage(response.data);
    } catch (error) {
      console.error("Optimize error:", error);
      alert("Failed to optimize image");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBackground = async () => {
    if (!uploadedImage) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/remove-background`, {
        public_id: uploadedImage.public_id,
      });

      setTransformedImage(response.data);
    } catch (error) {
      console.error("Background removal error:", error);
      alert("Failed to remove background");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Optimization",
      description:
        "Automatically optimize your images for web, mobile, and print with advanced AI algorithms.",
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "Background Removal",
      description:
        "Remove backgrounds instantly with precision using state-of-the-art machine learning.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Color Enhancement",
      description:
        "Enhance colors, adjust brightness, contrast, and saturation with professional tools.",
    },
    {
      icon: <Crop className="w-8 h-8" />,
      title: "Smart Resizing",
      description:
        "Resize and crop images intelligently while maintaining quality and aspect ratios.",
    },
    {
      icon: <Filter className="w-8 h-8" />,
      title: "Format Conversion",
      description:
        "Convert between multiple formats including WebP, AVIF, PNG, JPG, and more.",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Batch Processing",
      description:
        "Process multiple images simultaneously with consistent transformations.",
    },
  ];

  const stats = [
    {
      number: "10M+",
      label: "Images Processed",
      icon: <ImageIcon className="w-6 h-6" />,
    },
    {
      number: "500K+",
      label: "Happy Users",
      icon: <Users className="w-6 h-6" />,
    },
    { number: "99.9%", label: "Uptime", icon: <Award className="w-6 h-6" /> },
    {
      number: "50+",
      label: "Formats Supported",
      icon: <Star className="w-6 h-6" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400 rounded-full opacity-10 blur-3xl"
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl opacity-30 blur-sm"
                />
              </div>
              <span className="text-2xl font-bold text-white">
                imageKFormat
              </span>
            </motion.div>

            <div className="hidden md:flex space-x-8">
              {["Hero", "Features", "Editor", "Stats", "About"].map(
                (item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-white/80 hover:text-white transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {item}
                  </motion.button>
                )
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
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
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Images
              </motion.span>
            </h1>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional image processing powered by AI. Optimize, enhance,
              and transform your images with cutting-edge technology in seconds.
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
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
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

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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

      {/* Editor Section */}
      <section id="editor" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Image Editor Studio
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Upload and transform your images with our powerful editing tools
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-8 py-4 rounded-xl transition-all duration-300 ${
                  activeTab === "upload"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                    : "text-blue-100 hover:text-white hover:bg-white/10"
                }`}
              >
                <Upload className="w-5 h-5 inline mr-3" />
                Upload
              </button>
              <button
                onClick={() => setActiveTab("edit")}
                disabled={!uploadedImage}
                className={`px-8 py-4 rounded-xl transition-all duration-300 ml-2 ${
                  activeTab === "edit" && uploadedImage
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                    : "text-blue-300 cursor-not-allowed opacity-50"
                }`}
              >
                <Settings className="w-5 h-5 inline mr-3" />
                Edit
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20"
              >
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? "border-blue-400 bg-blue-500/10 scale-105"
                      : "border-white/30 hover:border-blue-400 hover:bg-white/5"
                  }`}
                >
                  <input {...getInputProps()} />
                  <motion.div
                    animate={loading ? { rotate: 360 } : {}}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {loading ? (
                      <Loader2 className="w-20 h-20 mx-auto mb-6 text-blue-400" />
                    ) : (
                      <ImageIcon className="w-20 h-20 mx-auto mb-6 text-blue-300" />
                    )}
                  </motion.div>

                  {loading ? (
                    <p className="text-2xl text-blue-100">
                      Uploading your image...
                    </p>
                  ) : isDragActive ? (
                    <p className="text-2xl text-blue-200">
                      Drop your image here!
                    </p>
                  ) : (
                    <div>
                      <p className="text-2xl text-white mb-4">
                        Drag & drop an image here, or click to select
                      </p>
                      <p className="text-blue-200">
                        Supports: JPEG, PNG, WebP, GIF • Max size: 50MB
                      </p>
                    </div>
                  )}
                </div>

                {uploadedImage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 text-center"
                  >
                    <div className="relative inline-block">
                      <img
                        src={uploadedImage.url}
                        alt="Uploaded"
                        className="max-w-md max-h-96 mx-auto rounded-2xl shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                    </div>
                    <div className="mt-6 text-blue-100 space-y-2">
                      <p className="text-lg">
                        Size: {(uploadedImage.original?.size / 1024).toFixed(2)}{" "}
                        KB
                      </p>
                      <p className="text-lg">
                        Dimensions: {uploadedImage.original?.width} ×{" "}
                        {uploadedImage.original?.height}
                      </p>
                      <p className="text-lg">
                        Format: {uploadedImage.original?.format?.toUpperCase()}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "edit" && uploadedImage && (
              <motion.div
                key="edit"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 xl:grid-cols-4 gap-8"
              >
                {/* Controls Panel */}
                <div className="xl:col-span-1">
                  <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 sticky top-8">
                    <h3 className="text-2xl font-bold mb-8 text-white flex items-center">
                      <Settings className="w-6 h-6 mr-3 text-blue-300" />
                      Transform Settings
                    </h3>

                    {/* Quick Actions */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-4 text-blue-100 text-lg">
                        Quick Actions
                      </h4>
                      <div className="space-y-3">
                        <motion.button
                          onClick={handleOptimize}
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 flex items-center justify-center shadow-lg hover:shadow-green-500/25"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Zap className="w-5 h-5 mr-3" />
                          Auto Optimize
                        </motion.button>
                        <motion.button
                          onClick={handleRemoveBackground}
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-purple-500/25"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Wand2 className="w-5 h-5 mr-3" />
                          Remove Background
                        </motion.button>
                      </div>
                    </div>

                    {/* Format & Quality */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-blue-100 font-medium mb-3 text-lg">
                          Format
                        </label>
                        <select
                          value={transformations.format}
                          onChange={(e) =>
                            setTransformations((prev) => ({
                              ...prev,
                              format: e.target.value,
                            }))
                          }
                          className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        >
                          <option value="" className="bg-gray-800">
                            Keep Original
                          </option>
                          <option value="jpg" className="bg-gray-800">
                            JPG
                          </option>
                          <option value="png" className="bg-gray-800">
                            PNG
                          </option>
                          <option value="webp" className="bg-gray-800">
                            WebP
                          </option>
                          <option value="avif" className="bg-gray-800">
                            AVIF
                          </option>
                          <option value="gif" className="bg-gray-800">
                            GIF
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-blue-100 font-medium mb-3 text-lg">
                          Quality
                        </label>
                        <select
                          value={transformations.quality}
                          onChange={(e) =>
                            setTransformations((prev) => ({
                              ...prev,
                              quality: e.target.value,
                            }))
                          }
                          className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        >
                          <option value="auto" className="bg-gray-800">
                            Auto
                          </option>
                          <option value="100" className="bg-gray-800">
                            100% (Best)
                          </option>
                          <option value="90" className="bg-gray-800">
                            90%
                          </option>
                          <option value="80" className="bg-gray-800">
                            80%
                          </option>
                          <option value="70" className="bg-gray-800">
                            70%
                          </option>
                          <option value="60" className="bg-gray-800">
                            60%
                          </option>
                          <option value="50" className="bg-gray-800">
                            50%
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-blue-100 font-medium mb-3 text-lg">
                          Dimensions
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="number"
                            placeholder="Width"
                            value={transformations.width}
                            onChange={(e) =>
                              setTransformations((prev) => ({
                                ...prev,
                                width: e.target.value,
                              }))
                            }
                            className="p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          />
                          <input
                            type="number"
                            placeholder="Height"
                            value={transformations.height}
                            onChange={(e) =>
                              setTransformations((prev) => ({
                                ...prev,
                                height: e.target.value,
                              }))
                            }
                            className="p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-blue-100 font-medium mb-3 text-lg">
                          Enhancement
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={transformations.enhance}
                            onChange={(e) =>
                              setTransformations((prev) => ({
                                ...prev,
                                enhance: e.target.checked,
                              }))
                            }
                            className="sr-only"
                          />
                          <div
                            className={`relative w-6 h-6 rounded-md border-2 transition-all duration-200 ${
                              transformations.enhance
                                ? "bg-blue-500 border-blue-500"
                                : "border-white/30"
                            }`}
                          >
                            {transformations.enhance && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <Sparkles className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </div>
                          <span className="ml-3 text-white">Auto Enhance</span>
                        </label>
                      </div>
                    </div>

                    <motion.button
                      onClick={handleTransform}
                      disabled={loading}
                      className="w-full mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 shadow-xl hover:shadow-blue-500/25"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 inline mr-3 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 inline mr-3" />
                          Apply Transform
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Image Preview */}
                <div className="xl:col-span-3">
                  <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Original */}
                      <div>
                        <h4 className="font-semibold mb-4 text-white text-xl flex items-center">
                          <ImageIcon className="w-5 h-5 mr-2 text-blue-300" />
                          Original
                        </h4>
                        <div className="relative group">
                          <img
                            src={uploadedImage.url}
                            alt="Original"
                            className="w-full rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>

                      {/* Transformed */}
                      <div>
                        <h4 className="font-semibold mb-4 text-white text-xl flex items-center justify-between">
                          <span className="flex items-center">
                            <Sparkles className="w-5 h-5 mr-2 text-blue-300" />
                            Transformed
                          </span>
                          {transformedImage && (
                            <motion.button
                              onClick={() =>
                                downloadImage(
                                  transformedImage.transformed_url ||
                                    transformedImage.optimized_url ||
                                    transformedImage.bg_removed_url,
                                  "transformed-image"
                                )
                              }
                              className="text-blue-400 hover:text-blue-300 bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Download className="w-5 h-5" />
                            </motion.button>
                          )}
                        </h4>
                        {transformedImage ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                          >
                            <img
                              src={
                                transformedImage.transformed_url ||
                                transformedImage.optimized_url ||
                                transformedImage.bg_removed_url
                              }
                              alt="Transformed"
                              className="w-full rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        ) : (
                          <div className="w-full aspect-square bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center">
                            <div className="text-center">
                              <Wand2 className="w-12 h-12 text-blue-300 mx-auto mb-4 opacity-50" />
                              <p className="text-blue-200">
                                Apply transformations to see preview
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Section */}
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
              Join the community of creators, designers, and businesses who
              trust imageKFormat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
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

      {/* About Section */}
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
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
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
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-blue-400 rounded-full opacity-20 blur-xl"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-indigo-400 rounded-full opacity-20 blur-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <span className="text-3xl font-bold text-white">
                imageKFormat
              </span>
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
    </div>
  );
};

export default ImageModifier;
