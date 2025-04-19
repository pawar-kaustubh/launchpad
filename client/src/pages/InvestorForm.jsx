import React, { useState, useEffect } from "react";

const InvestorForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    country: "",
    location: "",
    linkedin: "",
    investmentType: "",
    industryInterest: [],
    ticketSize: "",
    minInvestment: "",
    fundingStageInterest: [],
    portfolio: "",
    about: "",
    website: "",
    preferredEquityRange: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  // Industry options
  const industryOptions = [
    "Technology",
    "Healthcare",
    "Fintech",
    "E-commerce",
    "Education",
    "Artificial Intelligence",
    "Blockchain",
    "Clean Energy",
    "Biotech",
    "Consumer Goods",
    "Real Estate",
    "Entertainment",
  ];

  // Funding stage options
  const fundingStageOptions = [
    "Pre-Seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C+",
    "Growth Stage",
  ];

  // Investment type options
  const investmentTypeOptions = [
    "Angel Investor",
    "Venture Capital",
    "Private Equity",
    "Corporate Investor",
    "Family Office",
    "Accelerator",
  ];

  // Calculate progress based on filled fields
  useEffect(() => {
    const totalFields = Object.keys(formData).length; // Total fields is 16
    const filledFields = Object.entries(formData).filter(([key, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== "" && value !== null;
    }).length;
    const calculatedProgress = Math.round((filledFields / totalFields) * 100);
    setProgress(Math.min(100, calculatedProgress)); // Cap at 100%
    console.log("Total Fields:", totalFields, "Filled Fields:", filledFields, "Progress:", calculatedProgress); // Debug
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? 
        (e.target.checked 
          ? [...prev[name], value] 
          : prev[name].filter(item => item !== value))
        : value,
    }));
    
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    const requiredFields = [
      "username",
      "fullname",
      "email",
      "phone",
      "country",
      "location",
      "linkedin",
      "investmentType",
      "industryInterest",
      "ticketSize",
      "minInvestment",
      "fundingStageInterest",
      "portfolio",
      "about",
      "website",
      "preferredEquityRange",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
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

    if (formData.linkedin && !formData.linkedin.includes("linkedin.com")) {
      newErrors.linkedin = "Please enter a valid LinkedIn URL";
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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }
  };

  const formSections = [
    {
      title: "Basic Info",
      icon: "👤",
      fields: [
        { label: "Username", type: "text", name: "username", placeholder: "Your unique identifier" },
        { label: "Full Name", type: "text", name: "fullname", placeholder: "Your full legal name" },
        { label: "Email Address", type: "email", name: "email", placeholder: "your@email.com" },
        { label: "Phone Number", type: "tel", name: "phone", placeholder: "1234567890" },
        { label: "Country", type: "text", name: "country", placeholder: "Where are you based?" },
        { label: "Location", type: "text", name: "location", placeholder: "City, State/Region" },
        { label: "LinkedIn Profile", type: "url", name: "linkedin", placeholder: "https://linkedin.com/in/yourprofile" },
        { label: "Personal Website", type: "url", name: "website", placeholder: "https://yourwebsite.com" },
      ],
    },
    {
      title: "Investment Profile",
      icon: "💰",
      fields: [
        { 
          label: "Investment Type", 
          type: "select", 
          name: "investmentType", 
          options: investmentTypeOptions 
        },
        { 
          label: "Industries of Interest", 
          type: "checkbox-group", 
          name: "industryInterest", 
          options: industryOptions,
          description: "Select all that apply"
        },
        { 
          label: "Preferred Funding Stages", 
          type: "checkbox-group", 
          name: "fundingStageInterest", 
          options: fundingStageOptions,
          description: "Select all that apply"
        },
        { label: "Typical Ticket Size ($)", type: "number", name: "ticketSize", placeholder: "Maximum investment amount" },
        { label: "Minimum Investment ($)", type: "number", name: "minInvestment", placeholder: "Minimum investment amount" },
        { label: "Preferred Equity Range", type: "text", name: "preferredEquityRange", placeholder: "e.g., 5% - 15%" },
      ],
    },
    {
      title: "About You",
      icon: "📝",
      fields: [
        { label: "About You", type: "textarea", name: "about", placeholder: "Tell us about your investment philosophy and experience" },
        { label: "Portfolio Companies", type: "textarea", name: "portfolio", placeholder: "List companies you've invested in (names or URLs)" },
      ],
    },
  ];

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden text-center p-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">Registration Complete!</h2>
          <p className="mt-2 text-gray-600">Thank you for joining our investor network. We'll match you with relevant startup opportunities.</p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-5 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4 sm:px-6 lg:px-8 mt-15">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Header with progress */}
        <div className="bg-gradient-to-r from-blue-600 to-green-700 py-6 px-6 relative">
          <div className="absolute top-0 left-0 h-1 bg-gray-300 transition-all duration-300" style={{ width: `${progress}%`, background: progress > 0 ? "linear-gradient(to right, #3B82F6, #10B981)" : "#D1D5DB" }}></div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                🏦 Join Our Investor Network
              </h1>
              <p className="mt-2 text-gray-100">
                {progress < 50 
                  ? "Let's get to know you! Complete your profile to access startups." 
                  : progress < 80 
                    ? "Great progress! Investors like you drive innovation." 
                    : "Almost done! Your profile will be active shortly."}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 bg-white bg-opacity-20 rounded-full px-4 py-2">
              <span className="font-medium text-gray-800">{progress}% Complete</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sm:hidden border-b border-gray-200 px-4">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
                    ? "bg-white text-blue-600 border-t-2 border-blue-500 shadow-sm"
                    : "text-gray-500 hover:text-blue-500 hover:bg-white hover:bg-opacity-50"
                }`}
              >
                <span className="block text-lg mb-1">{section.icon}</span>
                <span>{section.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              {formSections[activeTab].icon} 
              <span className="ml-2">{formSections[activeTab].title}</span>
            </h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {formSections[activeTab].fields.map((field) => (
                <div 
                  key={field.name} 
                  className={
                    field.type === "textarea" || 
                    field.type === "checkbox-group" ? "sm:col-span-2" : ""
                  }
                >
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field.label}
                    {errors[field.name] && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.description && (
                    <p className="text-xs text-gray-500 mb-2">{field.description}</p>
                  )}

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={4}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border ${
                        errors[field.name] ? "border-red-300" : "border-gray-300"
                      } rounded-md transition duration-150 ease-in-out`}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border ${
                        errors[field.name] ? "border-red-300" : "border-gray-300"
                      } rounded-md py-2 px-3 transition duration-150 ease-in-out`}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select an option</option>
                      {field.options.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === "checkbox-group" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {field.options.map((option, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            id={`${field.name}-${i}`}
                            name={field.name}
                            type="checkbox"
                            value={option}
                            checked={formData[field.name].includes(option)}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`${field.name}-${i}`} className="ml-2 block text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border ${
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
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
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
                  className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
                    "Complete Registration"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      
      {/* Help text */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Need help? <a href="#" className="text-blue-600 hover:text-blue-500">Contact our investor relations team</a></p>
      </div>
    </div>
  );
};

export default InvestorForm;