import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Card = () => {
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  return (
    <motion.div
      className="p-6 rounded-2xl shadow-xl bg-white max-w-md mx-auto hover:shadow-2xl transition duration-300"
      whileHover={{ scale: 1.02 }}
    >
      {/* Added image above logo and name */}
      <img
        src="https://imgs.search.brave.com/L_1lTohCZLsX8TLqB5z7TuKBlqbdIr5lxmE7ilJfa_k/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vdmlzdGFwcmlu/dC9pbWFnZXMvdjE3/MDI2MjE5ODkvaWRl/YXMtYW5kLWFkdmlj/ZS1wcm9kL2VuLXVz/L2F0dGFjaG1lbnRf/MzA2MDI0NzAvYXR0/YWNobWVudF8zMDYw/MjQ3MC5qcGc_X2k9/QUE"
        alt="Startup Banner"
        className="w-full h-40 object-cover rounded-xl mb-4"
      />

      <div className="flex items-center space-x-4">
        <img
          src={"https://imgs.search.brave.com/nnlugCdwRztPW-JKQi0jyM-YfdcD1ZIlUmth9-cYDnA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zdGFydHVwLWJ1/c2luZXNzLWNvbmNl/cHRfNjcwMTQ3LTc0/OTEuanBnP3NlbXQ9/YWlzX2h5YnJpZA"}
          alt={"staup name"}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">Startup name</h2>
          <p className="text-sm text-gray-500">startup desc</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <strong>Valuation:</strong> Valuation
        </div>
        <div>
          <strong>Revenue:</strong> Revenue
        </div>
        <div>
          <strong>Profitable:</strong>{" "}
          <span className={true ? "text-green-600" : "text-red-600"}>
            {true ? "Yes" : "No"}
          </span>
        </div>
        <div>
          <strong>Investors:</strong> investors
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-1">Funding Progress</p>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-indigo-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${70}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="text-right text-xs mt-1 text-gray-600">
          {70}%
        </p>
      </div>
    </motion.div>
  );
};

export default Card;




  // Placeholder URL – replace with your actual API when ready
  // const API_URL = "https://your-backend-api.com/startup"; 

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(API_URL);
  //       const data = await res.json();
  //       setStartup(data);
  //     } catch (err) {
  //       setError("Failed to fetch data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="p-6 rounded-2xl shadow-md bg-white w-full max-w-md mx-auto text-center">
  //       <p className="text-gray-500">Loading...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="p-6 rounded-2xl shadow-md bg-red-50 text-red-600 w-full max-w-md mx-auto text-center">
  //       <p>{error}</p>
  //     </div>
  //   );
  // }