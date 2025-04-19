
import Startup from "../models/startup.model.js";
import { errorHandler } from "../utils/error.js";
import {askGeminiInvestor} from "../utils/gemini.js"; // ✅ Import Gemini

export const createStartup = async (req, res, next) => {
  try {
    const startup = await Startup.create({
      ...req.body,
      userRef: req.user.id,
    });
    return res.status(201).json(startup);
  } catch (error) {
    next(error);
  }
};

export const deleteStartup = async (req, res, next) => {
  const startup = await Startup.findById(req.params.id);

  if (!startup) {
    return next(errorHandler(404, 'Startup not found!'));
  }

  if (req.user.id !== startup.userRef) {
    return next(errorHandler(401, 'You can only delete your own startup!'));
  }

  try {
    await Startup.findByIdAndDelete(req.params.id);
    res.status(200).json('Startup has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateStartup = async (req, res, next) => {
  const startup = await Startup.findById(req.params.id);
  if (!startup) {
    return next(errorHandler(404, 'Startup not found!'));
  }
  if (req.user.id !== startup.userRef) {
    return next(errorHandler(401, 'You can only update your own startup!'));
  }

  try {
    const updateStartup = await Startup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateStartup);
  } catch (error) {
    next(error);
  }
};

export const analyzeStartup = async (req, res, next) => {
  try {
    const { name, idea, targetMarket } = req.body;

    const prompt = `
      Analyze the following startup idea and give feedback:
      - Name: ${name}
      - Idea: ${idea}
      - Target Market: ${targetMarket}
      Suggest improvements, uniqueness, and potential.
    `;

    const response = await askGeminiInvestor.generateContent(prompt);
    const result = await response.response.text();

    res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    next(err);
  }
};



export const getStartup = async (req, res, next) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return next(errorHandler(404, 'Startup not found!'));
    }
    res.status(200).json(startup);
  } catch (error) {
    next(error);
  }
  
  }

  export const getAllStartup = async (req, res, next) => {
    try {
      // Extract query parameters for pagination and sorting
      const { page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = req.query;
  
      // Build the query to filter startups by the logged-in user
      const filter = req.user ? { userRef: req.user.id } : {};
  
      // Fetch startups with pagination and sorting
      const startups = await Startup.find(filter)
        .sort({ [sortBy]: order === "desc" ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      // Get the total count of startups for pagination metadata
      const totalStartups = await Startup.countDocuments(filter);
  
      res.status(200).json({
        startups,
        totalStartups,
        totalPages: Math.ceil(totalStartups / limit),
        currentPage: Number(page),
      });
    } catch (error) {
      next(error);
    }
  };
