"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  Upload,
  Download,
  Loader2,
  ImageIcon,
  Settings,
  Zap,
} from "lucide-react";

const ImageModifier = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [transformedImage, setTransformedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Image Modifier Studio
          </h1>
          <p className="text-gray-600">
            Transform, optimize, and enhance your images with powerful AI tools
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === "upload"
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload
            </button>
            <button
              onClick={() => setActiveTab("edit")}
              disabled={!uploadedImage}
              className={`px-6 py-2 rounded-md transition-all ml-2 ${
                activeTab === "edit" && uploadedImage
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Edit
            </button>
          </div>
        </div>

        {/* Upload Tab */}
        {activeTab === "upload" && (
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                isDragActive
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              {loading ? (
                <Loader2 className="w-16 h-16 mx-auto mb-4 text-indigo-500 animate-spin" />
              ) : (
                <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              )}

              {loading ? (
                <p className="text-lg text-gray-600">Uploading your image...</p>
              ) : isDragActive ? (
                <p className="text-lg text-indigo-600">Drop your image here!</p>
              ) : (
                <div>
                  <p className="text-lg text-gray-600 mb-2">
                    Drag & drop an image here, or click to select
                  </p>
                  <p className="text-sm text-gray-400">
                    Supports: JPEG, PNG, WebP, GIF
                  </p>
                </div>
              )}
            </div>

            {uploadedImage && (
              <div className="mt-8 text-center">
                <img
                  src={uploadedImage.url}
                  alt="Uploaded"
                  className="max-w-md mx-auto rounded-lg shadow-lg"
                />
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    Size: {(uploadedImage.original?.size / 1024).toFixed(2)} KB
                  </p>
                  <p>
                    Dimensions: {uploadedImage.original?.width} ×{" "}
                    {uploadedImage.original?.height}
                  </p>
                  <p>Format: {uploadedImage.original?.format?.toUpperCase()}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Edit Tab */}
        {activeTab === "edit" && uploadedImage && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls Panel */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Transform Settings
              </h3>

              {/* Quick Actions */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-gray-700">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={handleOptimize}
                    disabled={loading}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Auto Optimize
                  </button>
                  <button
                    onClick={handleRemoveBackground}
                    disabled={loading}
                    className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
                  >
                    Remove Background
                  </button>
                </div>
              </div>

              {/* Format Conversion */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">
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
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Keep Original</option>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                  <option value="avif">AVIF</option>
                  <option value="gif">GIF</option>
                </select>
              </div>

              {/* Quality */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">
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
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="auto">Auto</option>
                  <option value="100">100% (Best)</option>
                  <option value="90">90%</option>
                  <option value="80">80%</option>
                  <option value="70">70%</option>
                  <option value="60">60%</option>
                  <option value="50">50%</option>
                </select>
              </div>

              {/* Dimensions */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Dimensions
                </label>
                <div className="grid grid-cols-2 gap-2">
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
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Effects */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Enhancement
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={transformations.enhance}
                    onChange={(e) =>
                      setTransformations((prev) => ({
                        ...prev,
                        enhance: e.target.checked,
                      }))
                    }
                    className="mr-2"
                  />
                  Auto Enhance
                </label>
              </div>

              <button
                onClick={handleTransform}
                disabled={loading}
                className="w-full bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Apply Transform"
                )}
              </button>
            </div>

            {/* Image Preview */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-700">Original</h4>
                  <img
                    src={uploadedImage.url}
                    alt="Original"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>

                {/* Transformed */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-700 flex items-center justify-between">
                    Transformed
                    {transformedImage && (
                      <button
                        onClick={() =>
                          downloadImage(
                            transformedImage.transformed_url ||
                              transformedImage.optimized_url ||
                              transformedImage.bg_removed_url,
                            "transformed-image"
                          )
                        }
                        className="text-indigo-500 hover:text-indigo-700"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </h4>
                  {transformedImage ? (
                    <img
                      src={
                        transformedImage.transformed_url ||
                        transformedImage.optimized_url ||
                        transformedImage.bg_removed_url
                      }
                      alt="Transformed"
                      className="w-full rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400">
                        Apply transformations to see preview
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModifier;
