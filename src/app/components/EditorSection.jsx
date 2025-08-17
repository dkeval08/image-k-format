import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Settings,
  Loader2,
  ImageIcon,
  Wand2,
  Zap,
  Play,
  Sparkles,
  Download,
} from "lucide-react";

const EditorSection = ({
  activeTab,
  setActiveTab,
  uploadedImage,
  loading,
  getRootProps,
  getInputProps,
  isDragActive,
  handleOptimize,
  handleRemoveBackground,
  transformations,
  setTransformations,
  handleTransform,
  transformedImage,
  downloadImage,
}) => (
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
        {/* Upload Tab */}
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
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                <p className="text-2xl text-blue-200">Drop your image here!</p>
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
                    Size: {(uploadedImage.original?.size / 1024).toFixed(2)} KB
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
        {/* Edit Tab */}
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
              {/* ...Controls panel code (move from ImageModifier.jsx) ... */}
              {/* For brevity, you can move the full controls panel code here as in ImageModifier.jsx */}
            </div>
            {/* Image Preview */}
            <div className="xl:col-span-3">
              {/* ...Image preview code (move from ImageModifier.jsx) ... */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </section>
);

export default EditorSection;
