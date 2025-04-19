import React, { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

const StartUpForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    startupname: "",
    startupdesc: "",
    email: "",
    country: "",
    location: "",
    website: "",
    phone: "",
    industry: "",
    socials: "",
    team: "",
    totalsales: "",
    revenue: "",
    profit: "",
    loss: "",
    valuation: "",
    equity: "",
    pitchdeck: "",
    burnrate: "",
    runway: "",
    youtube: "",
    logo: null,
    coverImage: null,
    videoOption: "",
    videoFile: null,
  });

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", 
    "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", 
    "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", 
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", 
    "Congo (Kinshasa)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", 
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", 
    "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", 
    "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", 
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", 
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", 
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", 
    "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", 
    "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", 
    "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", 
    "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", 
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", 
    "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", 
    "Yemen", "Zambia", "Zimbabwe"
  ].sort();

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "E-commerce",
    "Artificial Intelligence",
    "Blockchain",
    "Clean Energy",
    "Biotechnology",
    "Entertainment",
    "Food & Beverage",
    "Real Estate",
    "Transportation",
    "Marketing",
    "Cybersecurity",
  ].sort();

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [uploadProgress, setUploadProgress] = useState({
    logo: 0,
    coverImage: 0,
    videoFile: 0,
  });
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const totalFields = Object.keys(formData).length - 1;
    const filledFields = Object.values(formData).filter(
      (value) =>
        (value !== "" && value !== null) ||
        (value && typeof value === "object" && value.name) ||
        value === "youtube" ||
        value === "file" ||
        value === "later"
    ).length;
    const calculatedProgress = Math.round((filledFields / totalFields) * 100);
    setProgress(filledFields > 0 ? calculatedProgress : 0);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    // Handle file inputs with validation
    if (type === "file") {
      const file = files[0];
      if (!file) return;
      
      let error = "";
      
      // Validate file type and size
      if (name === "logo" || name === "coverImage") {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          error = "Only JPEG, PNG, or WebP images are allowed";
        } else if (file.size > MAX_FILE_SIZE) {
          error = "Image size must be less than 10MB";
        }
      } else if (name === "videoFile") {
        if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
          error = "Only MP4, WebM, or QuickTime videos are allowed";
        } else if (file.size > 5 * MAX_FILE_SIZE) { // 50MB for videos
          error = "Video size must be less than 50MB";
        }
      }
      
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
        return;
      }
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleVideoOptionChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      videoOption: value,
      youtube: value === "youtube" ? prev.youtube : "",
      videoFile: value === "file" ? prev.videoFile : null,
    }));
    setErrors((prev) => ({ ...prev, youtube: "", videoFile: "" }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "username":
        if (!value) return "Username is required";
        if (value.length < 3) return "Username must be at least 3 characters";
        if (value.length > 30) return "Username must be less than 30 characters";
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Only letters, numbers, and underscores allowed";
        break;
      case "startupname":
        if (!value) return "Startup name is required";
        if (value.length < 3) return "Startup name must be at least 3 characters";
        if (value.length > 50) return "Startup name must be less than 50 characters";
        break;
      case "startupdesc":
        if (!value) return "Description is required";
        if (value.length < 20) return "Description must be at least 20 characters";
        if (value.length > 200) return "Description must be less than 200 characters";
        break;
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
        break;
      case "website":
        if (!value) return "Website is required";
        if (!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(:\d+)?(\/\S*)?$/.test(value)) 
          return "Invalid website URL";
        break;
      case "phone":
        if (!value) return "Phone number is required";
        if (!/^[\d\s+()-]{7,20}$/.test(value)) return "Invalid phone number";
        break;
      case "socials":
        if (!value) return "Social media links are required";
        if (!value.split(",").every(link => 
          /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(:\d+)?(\/\S*)?$/.test(link.trim())
        )) return "One or more invalid social media URLs";
        break;
      case "team":
        if (!value) return "Team overview is required";
        if (value.length < 30) return "Team overview must be at least 30 characters";
        break;
      case "totalsales":
      case "revenue":
      case "profit":
      case "loss":
      case "valuation":
      case "burnrate":
        if (value === "") return "This field is required";
        if (isNaN(value) || value < 0) return "Must be a positive number";
        break;
      case "equity":
        if (value === "") return "Equity percentage is required";
        if (isNaN(value) || value < 0 || value > 100) return "Must be between 0 and 100";
        break;
      case "runway":
        if (value === "") return "Runway is required";
        if (isNaN(value) || value < 1 || value > 36) return "Must be between 1 and 36 months";
        break;
      case "pitchdeck":
        if (!value) return "Pitch deck link is required";
        if (!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(:\d+)?(\/\S*)?$/.test(value))
          return "Invalid pitch deck URL";
        break;
      case "youtube":
        if (formData.videoOption === "youtube" && !value) 
          return "YouTube URL is required";
        if (value && !/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(value))
          return "Invalid YouTube URL";
        break;
      case "videoFile":
        if (formData.videoOption === "file" && !value) 
          return "Video file is required";
        break;
      default:
        if (!value) return "This field is required";
    }
    return "";
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate all fields
    Object.keys(formData).forEach((field) => {
      if (field === "logo" || field === "coverImage" || field === "videoFile") {
        if ((field === "logo" || field === "coverImage") && !formData[field]) {
          newErrors[field] = `${field === "logo" ? "Logo" : "Cover image"} is required`;
          isValid = false;
        }
      } else if (field !== "videoOption") {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });

    // Special validation for video option
    if (!formData.videoOption) {
      newErrors.videoOption = "Please select a video option";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const uploadFileToFirebase = async (file, storagePath, fileType) => {
    if (!file) return null;

    const storage = getStorage(app);
    const fileRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress((prev) => ({
            ...prev,
            [fileType]: progress,
          }));
        },
        (error) => {
          console.error("Error uploading file:", error);
          setErrors((prev) => ({
            ...prev,
            [fileType]: `Upload failed: ${error.message}`,
          }));
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploadProgress((prev) => ({
              ...prev,
              [fileType]: 100,
            }));
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            reject(error);
          }
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(`field-${firstErrorField}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    if (!currentUser?._id) {
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Upload files in parallel
      const [logoURL, coverImageURL, videoURL] = await Promise.all([
        uploadFileToFirebase(
          formData.logo,
          `startups/${currentUser._id}/logo/${formData.logo.name}`,
          "logo"
        ),
        uploadFileToFirebase(
          formData.coverImage,
          `startups/${currentUser._id}/cover/${formData.coverImage.name}`,
          "coverImage"
        ),
        formData.videoOption === "file" && formData.videoFile
          ? uploadFileToFirebase(
              formData.videoFile,
              `startups/${currentUser._id}/video/${formData.videoFile.name}`,
              "videoFile"
            )
          : formData.videoOption === "youtube"
          ? formData.youtube
          : null,
      ]);

      const startupDataToSend = {
        ...formData,
        logo: logoURL,
        coverImage: coverImageURL,
        video: videoURL,
        userId: currentUser._id,
        createdAt: new Date().toISOString(),
      };

      // Remove unnecessary fields
      delete startupDataToSend.videoOption;
      delete startupDataToSend.videoFile;
      delete startupDataToSend.youtube;

      // Convert numeric fields to numbers
      const numericFields = [
        "totalsales",
        "revenue",
        "profit",
        "loss",
        "valuation",
        "equity",
        "burnrate",
        "runway",
      ];
      numericFields.forEach((field) => {
        if (startupDataToSend[field] !== "") {
          startupDataToSend[field] = Number(startupDataToSend[field]);
        }
      });

      const response = await fetch("/api/startup/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(startupDataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit startup data");
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors((prev) => ({
        ...prev,
        submission: error.message || "Failed to submit. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formSections = [
    {
      title: "Basic Information",
      icon: "📝",
      fields: [
        {
          label: "Username",
          type: "text",
          name: "username",
          placeholder: "Your unique identifier",
          minLength: 3,
          maxLength: 30,
        },
        {
          label: "Startup Name",
          type: "text",
          name: "startupname",
          placeholder: "What's your venture called?",
          minLength: 3,
          maxLength: 50,
        },
        {
          label: "Brief Description",
          type: "textarea",
          name: "startupdesc",
          placeholder: "Describe your startup in 1-2 sentences",
          minLength: 20,
          maxLength: 200,
        },
        {
          label: "Email Address",
          type: "email",
          name: "email",
          placeholder: "contact@yourstartup.com",
        },
        {
          label: "Country",
          type: "select",
          name: "country",
          options: countries,
          placeholder: "Select your country",
        },
        {
          label: "Location",
          type: "text",
          name: "location",
          placeholder: "City, State/Region",
        },
        {
          label: "Website",
          type: "url",
          name: "website",
          placeholder: "https://yourstartup.com",
        },
        {
          label: "Phone Number",
          type: "tel",
          name: "phone",
          placeholder: "+1 (123) 456-7890",
        },
        {
          label: "Industry",
          type: "select",
          name: "industry",
          options: industries,
          placeholder: "Select your industry",
        },
        {
          label: "Social Media Links (comma separated)",
          type: "text",
          name: "socials",
          placeholder: "https://linkedin.com/yourprofile, https://twitter.com/yourhandle",
        },
      ],
    },
    {
      title: "Team Details",
      icon: "👥",
      fields: [
        {
          label: "Team Overview",
          type: "textarea",
          name: "team",
          placeholder: "Tell us about your team members and their roles",
          minLength: 30,
        },
      ],
    },
    {
      title: "Financial Metrics",
      icon: "💰",
      fields: [
        {
          label: "Total Sales ($)",
          type: "number",
          name: "totalsales",
          placeholder: "Total sales to date",
          min: 0,
        },
        {
          label: "Annual Revenue ($)",
          type: "number",
          name: "revenue",
          placeholder: "Last 12 months revenue",
          min: 0,
        },
        {
          label: "Profit ($)",
          type: "number",
          name: "profit",
          placeholder: "Net profit",
          min: 0,
        },
        {
          label: "Loss ($)",
          type: "number",
          name: "loss",
          placeholder: "Net loss (if applicable)",
          min: 0,
        },
        {
          label: "Valuation ($)",
          type: "number",
          name: "valuation",
          placeholder: "Current valuation",
          min: 0,
        },
        {
          label: "Equity Available (%)",
          type: "number",
          name: "equity",
          placeholder: "Equity available for investors",
          min: 0,
          max: 100,
        },
        {
          label: "Burn Rate ($/month)",
          type: "number",
          name: "burnrate",
          placeholder: "Monthly expenses",
          min: 0,
        },
        {
          label: "Runway (Months)",
          type: "number",
          name: "runway",
          placeholder: "Months of operation left",
          min: 1,
          max: 36,
        },
      ],
    },
    {
      title: "Media & Documents",
      icon: "📷",
      fields: [
        {
          label: "Pitch Video Option",
          type: "select",
          name: "videoOption",
          options: [
            { value: "youtube", label: "YouTube Link" },
            { value: "file", label: "Upload Video" },
            { value: "later", label: "Add Later" },
          ],
          onChange: handleVideoOptionChange,
        },
        {
          label: "YouTube Video Link",
          type: "url",
          name: "youtube",
          placeholder: "https://youtube.com/watch?v=...",
          hidden: formData.videoOption !== "youtube",
        },
        {
          label: "Upload Video File (max 50MB)",
          type: "file",
          name: "videoFile",
          accept: "video/*",
          hidden: formData.videoOption !== "file",
        },
        {
          label: "Link to Pitch Deck",
          type: "url",
          name: "pitchdeck",
          placeholder: "Google Drive, Dropbox, etc.",
        },
        {
          label: "Startup Logo (max 10MB)",
          type: "file",
          name: "logo",
          accept: "image/*",
        },
        {
          label: "Cover Image (max 10MB)",
          type: "file",
          name: "coverImage",
          accept: "image/*",
        },
      ],
    },
  ];

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden text-center p-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-900/30 border border-green-400/30">
            <svg
              className="h-6 w-6 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Submission Successful!
          </h2>
          <p className="mt-2 text-gray-300">
            Thank you for submitting your startup information. We will review
            your application shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full bg-gradient-to-br from-blue-400/50 to-purple-500/40 blur-[70px]"
          style={{
            width: "120px",
            height: "120px",
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.08s ease-out, top 0.08s ease-out",
          }}
        />
        <div
          className="absolute rounded-full bg-gradient-to-br from-blue-500/40 to-purple-600/30 blur-[90px]"
          style={{
            width: "180px",
            height: "180px",
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.12s ease-out, top 0.12s ease-out",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-center p-6 bg-gradient-to-r from-blue-600 to-purple-600">
            Startup Registration Form
          </h1>

          <div className="p-6">
            {/* Progress bar with tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {formSections.map((section, index) => (
                  <button
                    key={index}
                    className={`flex items-center text-xs sm:text-sm font-medium px-3 py-1 rounded-full transition-all ${
                      activeTab === index
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-700/80"
                    }`}
                    onClick={() => setActiveTab(index)}
                    disabled={isSubmitting}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </button>
                ))}
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">Progress</span>
                <span className="text-xs font-medium text-blue-300">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Form content */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submission && (
                <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg">
                  <p className="text-red-300 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.submission}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formSections[activeTab].fields.map((field, index) => {
                  const inputId = `field-${field.name}-${index}`;
                  if (field.hidden) return null;

                  return (
                    <div
                      key={inputId}
                      id={inputId}
                      className={`${
                        field.type === "textarea" || field.name === "team"
                          ? "md:col-span-2"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-red-400 ml-1">*</span>
                        )}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          id={inputId}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          rows={4}
                          minLength={field.minLength}
                          maxLength={field.maxLength}
                          className={`w-full bg-gray-700/50 border ${
                            errors[field.name]
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                          } rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
                          disabled={isSubmitting}
                        />
                      ) : field.type === "select" ? (
                        <select
                          id={inputId}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={field.onChange || handleChange}
                          className={`w-full bg-gray-700/50 border ${
                            errors[field.name]
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                          } rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
                          disabled={isSubmitting}
                        >
                          <option value="" disabled className="text-gray-400">
                            {field.placeholder}
                          </option>
                          {field.options.map((option) => (
                            <option
                              key={option.value || option}
                              value={option.value || option}
                              className="bg-gray-800 text-white"
                            >
                              {option.label || option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "file" ? (
                        <div className="relative">
                          <input
                            id={inputId}
                            type={field.type}
                            name={field.name}
                            onChange={handleChange}
                            accept={field.accept}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={isSubmitting}
                          />
                          <div
                            className={`flex items-center justify-between bg-gray-700/50 border ${
                              errors[field.name]
                                ? "border-red-500"
                                : "border-gray-600 hover:border-blue-400"
                            } rounded-lg px-4 py-2 transition`}
                          >
                            <span className="text-gray-300 truncate">
                              {formData[field.name]?.name || "Choose file..."}
                            </span>
                            <svg
                              className="w-5 h-5 text-blue-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                          {uploadProgress[field.name] > 0 && (
                            <div className="mt-1 w-full bg-gray-700 rounded-full h-1.5">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full"
                                style={{
                                  width: `${uploadProgress[field.name]}%`,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          id={inputId}
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          min={field.min}
                          max={field.max}
                          minLength={field.minLength}
                          maxLength={field.maxLength}
                          className={`w-full bg-gray-700/50 border ${
                            errors[field.name]
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                          } rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
                          disabled={isSubmitting}
                        />
                      )}

                      {errors[field.name] && (
                        <p className="mt-1 text-xs text-red-400 flex items-center">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                {activeTab > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab((prevTab) => prevTab - 1)}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all hover:-translate-x-1 flex items-center"
                    disabled={isSubmitting}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </button>
                )}

                <div className="ml-auto">
                  {activeTab < formSections.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setActiveTab((prevTab) => prevTab + 1)}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all hover:translate-x-1 flex items-center"
                      disabled={isSubmitting}
                    >
                      Next
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all hover:scale-105 flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartUpForm;