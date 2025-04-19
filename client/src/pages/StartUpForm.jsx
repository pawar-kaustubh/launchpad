import React, { useState, useEffect } from "react";

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
    videoOption: "", // Default to empty, user must select
    videoFile: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalFields = Object.keys(formData).length - 1; // Exclude videoOption initially
    const filledFields = Object.values(formData).filter(
      (value) => 
        (value !== "" && value !== null) || 
        (value && typeof value === "object" && value.name) || 
        (value === "youtube" || value === "file" || value === "later") // Only these count for videoOption
    ).length;
    const calculatedProgress = Math.round((filledFields / totalFields) * 100);
    setProgress(filledFields > 0 ? calculatedProgress : 0); // Strictly 0% if no fields filled
    console.log("Total Fields:", totalFields, "Filled Fields:", filledFields, "Progress:", calculatedProgress); // Debug
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleVideoOptionChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      videoOption: value,
      youtube: value === "youtube" ? prev.youtube : "",
      videoFile: value === "file" ? prev.videoFile : null,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, youtube: "", videoFile: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    const requiredFields = [
      "username",
      "startupname",
      "startupdesc",
      "email",
      "country",
      "location",
      "website",
      "phone",
      "industry",
      "socials",
      "team",
      "totalsales",
      "revenue",
      "profit",
      "loss",
      "valuation",
      "equity",
      "pitchdeck",
      "burnrate",
      "runway",
      "videoOption", // Require video option to be selected
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] && field !== "youtube" && field !== "videoFile") {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
      isValid = false;
    }

    if (formData.videoOption === "youtube" && formData.youtube && !/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(formData.youtube)) {
      newErrors.youtube = "Invalid YouTube URL";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log("Submitting data:", formData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }
  };

  const formSections = [
    {
      title: "Basic Information",
      icon: "📝",
      fields: [
        { label: "Username", type: "text", name: "username", placeholder: "Your unique identifier" },
        { label: "Startup Name", type: "text", name: "startupname", placeholder: "What's your venture called?" },
        { label: "Brief Description", type: "textarea", name: "startupdesc", placeholder: "Describe your startup in 1-2 sentences" },
        { label: "Email Address", type: "email", name: "email", placeholder: "contact@yourstartup.com" },
        { label: "Country", type: "text", name: "country", placeholder: "Where are you based?" },
        { label: "Location", type: "text", name: "location", placeholder: "City, State/Region" },
        { label: "Website", type: "url", name: "website", placeholder: "https://yourstartup.com" },
        { label: "Phone Number", type: "tel", name: "phone", placeholder: "1234567890" },
        { label: "Industry", type: "text", name: "industry", placeholder: "E.g., Fintech, HealthTech, SaaS" },
        { label: "Social Media Links", type: "url", name: "socials", placeholder: "LinkedIn, Twitter, etc." },
      ],
    },
    {
      title: "Team Details",
      icon: "👥",
      fields: [
        { label: "Team Overview", type: "textarea", name: "team", placeholder: "Tell us about your team members and their roles" },
      ],
    },
    {
      title: "Financial Metrics",
      icon: "💰",
      fields: [
        { label: "Total Sales", type: "number", name: "totalsales", placeholder: "Total sales to date" },
        { label: "Annual Revenue", type: "number", name: "revenue", placeholder: "Last 12 months revenue" },
        { label: "Profit", type: "number", name: "profit", placeholder: "Net profit" },
        { label: "Loss", type: "number", name: "loss", placeholder: "Net loss (if applicable)" },
        { label: "Valuation", type: "number", name: "valuation", placeholder: "Current valuation" },
        { label: "Equity (%)", type: "number", name: "equity", placeholder: "Equity available" },
        { label: "Burn Rate", type: "number", name: "burnrate", placeholder: "Monthly expenses" },
        { label: "Runway (Months)", type: "number", name: "runway", placeholder: "Months of operation left" },
      ],
    },
    {
      title: "Media & Documents",
      icon: "📷",
      fields: [
        { label: "Link to Pitch Deck", type: "url", name: "pitchdeck", placeholder: "Link to your investor deck" },
        { label: "Pitch Video Option", type: "select", name: "videoOption", options: ["youtube", "file", "later"], onChange: handleVideoOptionChange },
        { label: "YouTube Video Link", type: "url", name: "youtube", placeholder: "https://youtube.com/watch?v=...", hidden: formData.videoOption !== "youtube" },
        { label: "Upload Video File", type: "file", name: "videoFile", accept: "video/*", hidden: formData.videoOption !== "file" },
        { label: "Startup Logo", type: "file", name: "logo", accept: "image/*" },
        { label: "Cover Image", type: "file", name: "coverImage", accept: "image/*" },
      ],
    },
  ];

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden text-center p-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">Submission Successful!</h2>
          <p className="mt-2 text-gray-600">
            Thank you for sharing your startup details. We'll review your information and get back to you soon.
            {formData.videoOption === "later" || (!formData.youtube && !formData.videoFile) && (
              <span className="block mt-2 text-yellow-600">
                Reminder: Please add a pitch video (YouTube link or file) for analysis and display on your profile/pitch section.
              </span>
            )}
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-5 inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 py-6 px-6 relative">
          <div className="absolute top-0 left-0 h-1 bg-gray-300 transition-all duration-300" style={{ width: `${progress}%`, background: progress > 0 ? "linear-gradient(to right, #4B5EFC, #7B61FF)" : "#D1D5DB" }}></div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                🚀 Share Your Startup Story
              </h1>
              <p className="mt-2 text-gray-100">
                {progress < 50 
                  ? "Let's get started! Every great journey begins with a single step." 
                  : progress < 80 
                    ? "You're doing great! Keep going!" 
                    : "Almost there! Just a few more details."}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 bg-white bg-opacity-20 rounded-full px-4 py-2">
              <span className="font-medium text-gray-800">{progress}% Complete</span>
            </div>
          </div>
        </div>
        <div className="sm:hidden border-b border-gray-200 px-4">
          <label htmlFor="tabs" className="sr-only">Select a tab</label>
          <select
            id="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(parseInt(e.target.value))}
          >
            {formSections.map((section, index) => (
              <option key={index} value={index}>
                {section.icon} {section.title}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block bg-gray-50">
          <nav className="flex divide-x divide-gray-200" aria-label="Tabs">
            {formSections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 py-4 px-4 text-center text-sm font-medium transition-all duration-200 ${
                  activeTab === index
                    ? "bg-white text-indigo-600 border-t-2 border-indigo-500 shadow-sm"
                    : "text-gray-500 hover:text-indigo-500 hover:bg-white hover:bg-opacity-50"
                }`}
              >
                <span className="block text-lg mb-1">{section.icon}</span>
                <span>{section.title}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              {formSections[activeTab].icon} 
              <span className="ml-2">{formSections[activeTab].title}</span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {formSections[activeTab].fields.map((field) => {
                if (field.hidden && field.hidden) return null;
                return (
                  <div 
                    key={field.name} 
                    className={field.type === "textarea" || field.type === "file" || field.name === "videoOption" ? "sm:col-span-2" : ""}
                  >
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label}
                      <span className="text-red-500 ml-1">{errors[field.name] ? '*' : ''}</span>
                    </label>
                    {field.type === "select" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
                          errors[field.name] ? "border-red-300" : "border-gray-300"
                        } rounded-md py-2 px-3 transition duration-150 ease-in-out`}
                        value={formData[field.name]}
                        onChange={field.onChange || handleChange}
                        required
                      >
                        <option value="" disabled>Select an option</option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={4}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
                          errors[field.name] ? "border-red-300" : "border-gray-300"
                        } rounded-md transition duration-150 ease-in-out`}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                      />
                    ) : field.type === "file" ? (
                      <div className="mt-1 flex items-center">
                        <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Choose File
                          <input
                            type="file"
                            id={field.name}
                            name={field.name}
                            className="sr-only"
                            onChange={handleChange}
                            accept={field.accept}
                          />
                        </label>
                        <span className="ml-3 text-sm text-gray-500 truncate max-w-xs">
                          {formData[field.name] 
                            ? formData[field.name].name || "File selected" 
                            : "No file chosen"}
                        </span>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
                          errors[field.name] ? "border-red-300" : "border-gray-300"
                        } rounded-md py-2 px-3 transition duration-150 ease-in-out`}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                      />
                    )}
                    {errors[field.name] && (
                      <p className="mt-1 text-sm text-red-600 animate-pulse">{errors[field.name]}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
                  activeTab === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={activeTab === 0}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <div className="text-xs text-gray-500 hidden sm:block">
                Section {activeTab + 1} of {formSections.length}
              </div>
              {activeTab < formSections.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveTab((prev) => Math.min(formSections.length - 1, prev + 1))}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Submit Startup Info"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Need help? <a href="#" className="text-indigo-600 hover:text-indigo-500">Contact our support team</a></p>
      </div>
    </div>
  );
};

export default StartUpForm;