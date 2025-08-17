import React, { useState, useCallback } from "react";
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
  Image,
  ArrowRight,
  ArrowLeft,
  Play,
  Wand2,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

const EditorSection = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [transformedImage, setTransformedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
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

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/media`
    : "http://localhost:8000/api/media";

  // Step 1: File Upload
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
      setCurrentStep(2);
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

  // Step 2: Operation Selection
  const operations = [
    {
      id: "optimize",
      title: "Auto Optimize",
      description: "Automatically optimize image for web performance",
      icon: <Zap className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      action: handleOptimize,
    },
    {
      id: "remove-bg",
      title: "Remove Background",
      description: "Remove background using AI technology",
      icon: <Wand2 className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-600",
      action: handleRemoveBackground,
    },
    {
      id: "transform",
      title: "Custom Transform",
      description: "Advanced editing with custom parameters",
      icon: <Settings className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-600",
      action: () => {
        setSelectedOperation("transform");
        setCurrentStep(3);
      },
    },
  ];

  async function handleOptimize() {
    if (!uploadedImage) return;

    setLoading(true);
    setSelectedOperation("optimize");

    try {
      const response = await axios.post(`${API_BASE_URL}/optimize`, {
        public_id: uploadedImage.public_id,
      });

      setTransformedImage(response.data);
      setCurrentStep(3);
    } catch (error) {
      console.error("Optimize error:", error);
      alert("Failed to optimize image");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveBackground() {
    if (!uploadedImage) return;

    setLoading(true);
    setSelectedOperation("remove-bg");

    try {
      const response = await axios.post(`${API_BASE_URL}/remove-background`, {
        public_id: uploadedImage.public_id,
      });

      setTransformedImage(response.data);
      setCurrentStep(3);
    } catch (error) {
      console.error("Background removal error:", error);
      alert("Failed to remove background");
    } finally {
      setLoading(false);
    }
  }

  // Step 3: Custom Transform
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

  // Download functionality
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

  // Reset to start
  const resetEditor = () => {
    setCurrentStep(1);
    setUploadedImage(null);
    setTransformedImage(null);
    setSelectedOperation(null);
    setTransformations({
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
  };

  // Step indicator
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                currentStep >= step
                  ? "bg-blue-500 text-white"
                  : "bg-white/20 text-blue-300"
              }`}
            >
              {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-1 rounded transition-all duration-300 ${
                  currentStep > step ? "bg-blue-500" : "bg-white/20"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  // Loading overlay
  const LoadingOverlay = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50  z-50 flex items-center justify-center"
    ></motion.div>
  );

  return (
    <section id="editor" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
            Transform your images with our powerful editing tools
          </p>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator />

        {/* Loading Overlay */}
        {/* <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence> */}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/10  rounded-3xl shadow-2xl p-0 md:p-12 md:border border-white/20">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-8 lg:p-16 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? "border-blue-400 bg-blue-500/10 scale-105"
                      : "border-white/30 hover:border-blue-400 hover:bg-white/5"
                  }`}
                >
                  <input {...getInputProps()} />
                  {!loading && (
                    <motion.div
                      animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ImageIcon className="w-20 h-20 mx-auto mb-6 text-blue-300" />
                    </motion.div>
                  )}

                  {isDragActive ? (
                    <p className="text-2xl text-blue-200">
                      Drop your image here!
                    </p>
                  ) : loading ? (
                    <div className="bg-transparent rounded-3xl p-8 text-center">
                      <div className="relative w-24 h-24 mx-auto mb-6">
                        <motion.div
                          className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        {/* Middle pulsing ring */}
                        <motion.div
                          className="absolute inset-2 border-2 border-transparent border-t-purple-300 border-l-pink-300 rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        {/* Inner animated dots */}
                        <div className="absolute inset-4 flex items-center justify-center">
                          <div className="relative w-8 h-8">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-blue-300 rounded-full"
                                style={{
                                  top: "50%",
                                  left: "50%",
                                  transformOrigin: "4px 0px",
                                }}
                                animate={{
                                  rotate: [0, 120, 240, 360],
                                  scale: [0.8, 1.2, 0.8],
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  delay: i * 0.4,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Central glowing core */}
                        <motion.div
                          className="absolute inset-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"
                          animate={{
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                      <p className="text-xl text-white font-semibold">
                        {selectedOperation === "optimize" &&
                          "Optimizing your image..."}
                        {selectedOperation === "remove-bg" &&
                          "Removing background..."}
                        {selectedOperation === "transform" &&
                          "Applying transformations..."}
                        {!selectedOperation && "Processing..."}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg md:text-2xl text-white mb-4">
                        Drag & drop an image here, or click to select
                      </p>
                      <p className="text-xs md:text-lg text-blue-200">
                        Supports: JPEG, PNG, WebP, GIF • Max size: 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Operation Selection */}
          {currentStep === 2 && uploadedImage && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Preview */}
                <div className="bg-white/10  rounded-3xl shadow-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <ImageIcon className="w-6 h-6 mr-3 text-blue-300" />
                    Uploaded Image
                  </h3>
                  <div className="relative group">
                    <img
                      src={uploadedImage.url}
                      alt="Uploaded"
                      className="w-full rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-blue-100 text-sm">Size</p>
                      <p className="text-white font-semibold">
                        {(uploadedImage.original?.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-blue-100 text-sm">Dimensions</p>
                      <p className="text-white font-semibold">
                        {uploadedImage.original?.width} ×{" "}
                        {uploadedImage.original?.height}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-blue-100 text-sm">Format</p>
                      <p className="text-white font-semibold">
                        {uploadedImage.original?.format?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Operations */}
                <div className="bg-white/10  rounded-3xl shadow-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Choose an Operation
                  </h3>
                  <div className="space-y-4">
                    {operations.map((operation) => (
                      <motion.button
                        key={operation.id}
                        onClick={operation.action}
                        className={`w-full p-6 rounded-2xl bg-gradient-to-r ${operation.color} text-white font-semibold text-left transition-all duration-300 hover:shadow-xl group`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              {operation.icon}
                              <span className="ml-3 text-xl">
                                {operation.title}
                              </span>
                            </div>
                            <p className="text-white/90 text-sm">
                              {operation.description}
                            </p>
                          </div>
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    onClick={() => setCurrentStep(1)}
                    className="w-full mt-6 bg-white/10 border border-white/20 text-white py-3 px-6 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Upload Different Image
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preview/Transform */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto"
            >
              {selectedOperation === "transform" ? (
                // Custom Transform Interface
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                  {/* Controls */}
                  <div className="xl:col-span-1">
                    <div className="bg-white/10  rounded-3xl shadow-2xl p-6 border border-white/20 sticky top-8">
                      <h3 className="text-xl font-bold mb-6 text-white">
                        Transform Settings
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-blue-100 font-medium mb-2">
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
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 "
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
                          </select>
                        </div>

                        <div>
                          <label className="block text-blue-100 font-medium mb-2">
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
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 "
                          >
                            <option value="auto" className="bg-gray-800">
                              Auto
                            </option>
                            <option value="100" className="bg-gray-800">
                              100%
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
                          </select>
                        </div>

                        <div>
                          <label className="block text-blue-100 font-medium mb-2">
                            Dimensions
                          </label>
                          <div className="grid grid-cols-1 gap-2">
                            <input
                              type="text"
                              placeholder="Width"
                              value={transformations.width}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                                setTransformations((prev) => ({
                                  ...prev,
                                  width: value,
                                }));
                              }}
                              className="p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 "
                            />
                            <input
                              type="text"
                              placeholder="Height"
                              value={transformations.height}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                                setTransformations((prev) => ({
                                  ...prev,
                                  height: value,
                                }));
                              }}
                              className="p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 "
                            />
                          </div>
                        </div>

                        <div>
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
                              className={`relative w-5 h-5 rounded border-2 transition-all duration-200 ${
                                transformations.enhance
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-white/30"
                              }`}
                            >
                              {transformations.enhance && (
                                <Image className="w-3 h-3 text-white absolute inset-0.5" />
                              )}
                            </div>
                            <span className="ml-3 text-white">
                              Auto Enhance
                            </span>
                          </label>
                        </div>
                      </div>

                      <motion.button
                        onClick={handleTransform}
                        disabled={loading}
                        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Play className="w-5 h-5 inline mr-2" />
                        Apply Transform
                      </motion.button>
                    </div>
                  </div>

                  {/* Image Comparison */}
                  <div className="xl:col-span-3">
                    <div className="bg-white/10  rounded-3xl shadow-2xl p-6 border border-white/20">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-6 text-white text-lg flex items-center">
                            <ImageIcon className="w-5 h-5 mr-2 text-blue-300" />
                            Original
                          </h4>
                          <img
                            src={uploadedImage.url}
                            alt="Original"
                            className="w-full rounded-2xl shadow-xl"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-4 text-white text-lg flex items-center justify-between">
                            <span className="flex items-center">
                              <Image className="w-5 h-5 mr-2 text-blue-300" />
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
                            <motion.img
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              src={
                                transformedImage.transformed_url ||
                                transformedImage.optimized_url ||
                                transformedImage.bg_removed_url
                              }
                              alt="Transformed"
                              className="w-full rounded-2xl shadow-xl"
                            />
                          ) : (
                            <div className="w-full aspect-square bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center">
                              <div className="text-center">
                                <Settings className="w-12 h-12 text-blue-300 mx-auto mb-4 opacity-50" />
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
                </div>
              ) : (
                // Simple Preview for Optimize/Remove BG
                <div className="max-w-6xl mx-auto">
                  <div className="bg-white/10  rounded-3xl shadow-2xl p-8 border border-white/20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-10 text-white text-xl flex items-center">
                          <ImageIcon className="w-6 h-6 mr-3 text-blue-300" />
                          Original
                        </h4>
                        <img
                          src={uploadedImage.url}
                          alt="Original"
                          className="w-full rounded-2xl shadow-xl"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4 text-white text-xl flex items-center justify-between">
                          <span className="flex items-center">
                            <Image className="w-6 h-6 mr-3 text-blue-300" />
                            {selectedOperation === "optimize"
                              ? "Optimized"
                              : "Background Removed"}
                          </span>
                          {transformedImage && (
                            <motion.button
                              onClick={() =>
                                downloadImage(
                                  transformedImage.optimized_url ||
                                    transformedImage.bg_removed_url,
                                  `${selectedOperation}-image`
                                )
                              }
                              className="bg-gradient-to-r from-green-500 to-emerald-600 text-sm md:text-xl text-white px-3 py-2 md:px-6 md:py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Download className="w-5 h-5 mr-2" />
                              Download
                            </motion.button>
                          )}
                        </h4>
                        {transformedImage ? (
                          <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            src={
                              transformedImage.optimized_url ||
                              transformedImage.bg_removed_url
                            }
                            alt="Processed"
                            className="w-full rounded-2xl shadow-xl"
                          />
                        ) : (
                          <div className="w-full aspect-square bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center">
                            <div className="text-center">
                              <Loader2 className="w-12 h-12 text-blue-300 mx-auto mb-4 animate-spin" />
                              <p className="text-blue-200">
                                Processing your image...
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-8">
                <motion.button
                  onClick={() => setCurrentStep(2)}
                  className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </motion.button>
                <motion.button
                  onClick={resetEditor}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Start Over
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EditorSection;
