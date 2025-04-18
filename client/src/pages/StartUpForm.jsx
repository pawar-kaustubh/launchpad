import React, { useState } from "react";

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
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    // Clear any existing error for this field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Basic required field validation
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
      "youtube",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    // Email format validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Phone number validation (basic - adjust as needed)
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitting data:", formData);
      // In a real application, you would send this formData to your backend API
      // using fetch or a library like Axios.
      // Example:
      // try {
      //   const response = await fetch('/api/startups', {
      //     method: 'POST',
      //     body: JSON.stringify(formData),
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   });
      //   const data = await response.json();
      //   console.log('Success:', data);
      //   // Optionally reset the form or show a success message
      //   setFormData({ ...initialFormData });
      // } catch (error) {
      //   console.error('Error:', error);
      //   // Optionally show an error message
      // }
    }
  };

  const formSections = [
    {
      title: "Basic Information",
      fields: [
        { label: "Username", type: "text", name: "username" },
        { label: "Startup Name", type: "text", name: "startupname" },
        { label: "Brief Description", type: "textarea", name: "startupdesc" },
        { label: "Email Address", type: "email", name: "email" },
        { label: "Country", type: "text", name: "country" },
        { label: "Location", type: "text", name: "location" },
        { label: "Website", type: "url", name: "website" },
        { label: "Phone Number", type: "tel", name: "phone" },
        { label: "Industry", type: "text", name: "industry" },
        { label: "Social Media Links", type: "url", name: "socials" },
      ],
    },
    {
      title: "Team Details",
      fields: [
        { label: "Team Overview", type: "textarea", name: "team" },
      ],
    },
    {
      title: "Financial Metrics",
      fields: [
        { label: "Total Sales", type: "number", name: "totalsales" },
        { label: "Annual Revenue", type: "number", name: "revenue" },
        { label: "Profit", type: "number", name: "profit" },
        { label: "Loss", type: "number", name: "loss" },
        { label: "Valuation", type: "number", name: "valuation" },
        { label: "Equity (%)", type: "number", name: "equity" },
        { label: "Burn Rate", type: "number", name: "burnrate" },
        { label: "Runway (Months)", type: "number", name: "runway" },
      ],
    },
    {
      title: "Media & Documents",
      fields: [
        { label: "Link to Pitch Deck", type: "url", name: "pitchdeck" },
        { label: "YouTube Video Link", type: "url", name: "youtube" },
        { label: "Startup Logo", type: "file", name: "logo" },
        { label: "Cover Image", type: "file", name: "coverImage" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-400 to-blue-500 py-6">
          <h1 className="text-3xl font-bold text-white text-center tracking-tight">
            🚀 Share Your Startup Story!
          </h1>
          <p className="mt-2 text-lg text-purple-100 text-center">
            Help us understand your awesome venture.
          </p>
        </div>

        {/* Tabs */}
        <div className="sm:hidden border-b border-gray-200">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(parseInt(e.target.value))}
          >
            {formSections.map((section, index) => (
              <option key={index} value={index}>
                {section.title}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4 border-b border-gray-200 px-4 sm:px-6" aria-label="Tabs">
            {formSections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`whitespace-nowrap py-4 px-3 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                  activeTab === index
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formSections[activeTab].fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows={3}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                )}
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
                )}
              </div>
            ))}

            {/* Navigation Buttons for Tabs */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  activeTab === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={activeTab === 0}
              >
                Previous
              </button>
              {activeTab < formSections.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveTab((prev) => Math.min(formSections.length - 1, prev + 1))}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Submit Startup Info
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartUpForm;