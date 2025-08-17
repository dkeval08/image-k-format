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
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import EditorSection from "./EditorSection";
import StatsSection from "./StatsSection";
import AboutSection from "./AboutSection";
import FooterSection from "./FooterSection";
import NavigationBar from "./NavigationBar";

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
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/media`
    : "http://localhost:8000/api/media";

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
    // {
    //   icon: <Palette className="w-8 h-8" />,
    //   title: "Color Enhancement",
    //   description:
    //     "Enhance colors, adjust brightness, contrast, and saturation with professional tools.",
    // },
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
    // {
    //   icon: <Layers className="w-8 h-8" />,
    //   title: "Batch Processing",
    //   description:
    //     "Process multiple images simultaneously with consistent transformations.",
    // },
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
      {/* Navigation */}
      <NavigationBar scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <HeroSection stats={stats} scrollToSection={scrollToSection} />

      {/* Features Section */}
      <FeaturesSection
        features={features}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      {/* Editor Section */}
      <EditorSection />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* About Section */}
      <AboutSection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default ImageModifier;
