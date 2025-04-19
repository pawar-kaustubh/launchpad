import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function FilterableCardGrid() {
  const [selectedType, setSelectedType] = useState("");

  

  const [hoveredCard, setHoveredCard] = useState(null);

  const [cards, setCards ] = useState([]);
  const navigate = useNavigate();

  const showDetails = (id) =>{
    navigate(`/startupdetails/${id}`)
  }
 

const types1 =  ["SaaS","e-commers"]
  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/startup/getall");
        const data = await response.json();
        // console.log(data)
        setCards(data.startups);
    
      } catch (error) {
        console.error("Error fetching startups:", error);
      }
    };

    fetchStartups(); }, []);
  
  const types = ["All", ...new Set(types1.map((c) => c))];
  const filtered =
    !selectedType || selectedType === "All"
      ? cards
      : cards.filter((c) => c.type === selectedType);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="w-full mx-auto p-4 flex flex-col md:flex-row gap-6 pt-20">
        {/* Sidebar */}
        <aside className="flex-none md:w-1/4 w-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            Filter Startups
          </h3>
          <select
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map((type) => (
              <option
                key={type}
                value={type === "All" ? "" : type}
                className="bg-gray-800"
              >
                {type}
              </option>
            ))}
          </select>

          <div className="mt-8">
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
              Startup Stats
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Startups</span>
                <span className="font-medium text-blue-400">
                  {cards.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Profitable</span>
                <span className="font-medium text-green-400">
                  {cards.filter((c) => c.profitable).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Funding Avg</span>
                <span className="font-medium text-purple-400">

                  {Math.round(
                    cards.reduce((acc, c) => acc + c.fundingProgress, 0) /
                      cards.length
                  )}
                  %

                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Cards */}
        <section className="flex-1 w-full">
          {filtered.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No startups found
              </h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((card) => (
                <motion.div
                  key={card?._id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-400/50 transition-all overflow-hidden flex flex-col"
                  whileHover={{ scale: 1.03 }}
                  onMouseEnter={() => setHoveredCard(card?.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden h-48" 
                      >
                    <img
                      src={card?.bannerImg}
                      alt={`${card?.name} banner`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <span className="absolute top-4 right-4 text-xs bg-gray-900/80 text-blue-400 px-3 py-1 rounded-full border border-blue-400/20">
                      {card.industry}
                    </span> 
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex items-start mb-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-white truncate">
                          {card.startupname}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                          {card.startupdesc}
                        </p>

                      </div>
                    </div>

                    <div className="mt-2 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Valuation</span>

                        <span className="font-medium text-blue-400">
                          {card.valuation}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Revenue</span>
                        <span className="font-medium text-purple-400">
                          {card.revenue}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Profitable</span>
                        <span
                          className={
                            card.profit
                              ? "text-green-400 font-medium"
                              : "text-red-400 font-medium"
                          }
                        >
                          {card.profit ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Investors</span>

                        <span className="font-medium text-white truncate max-w-[120px]">
                          {card.investors}
                        </span>

                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-700/50">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Funding Progress</span>
                        <span>{card?.fundingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-full rounded-full ${
                            hoveredCard === cards._id
                              ? "bg-gradient-to-r from-blue-500 to-purple-500"
                              : "bg-blue-500"
                          }`}

                          initial={{ width: 0 }}
                          animate={{ width: `${card.fundingProgress}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    </div>

                    <motion.button
             
                      className={`mt-6 w-full py-2 rounded-lg font-medium transition-all ${
                        
                        hoveredCard === card._id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={ ()=>showDetails(card._id)} 
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
