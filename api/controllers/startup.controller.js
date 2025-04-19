
import Startup from "../models/startup.model.js";
import { errorHandler } from "../utils/error.js";
import { askGeminiInvestor } from "../utils/gemini.js"; // ✅ Import Gemini

// Create Startup
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

// Delete Startup
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

// Update Startup
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

// Analyze Startup Idea with Gemini API
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

    // Assuming response is already the correct format
    const result = response.text; // or whatever structure your API returns

    res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    next(err);
  }
};

// Get a Single Startup
export const getStartup = async (req, res, next) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return next(errorHandler(404, 'Startup not found!'));
    }
    res.status(200).json(startup);
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// Get All Startups with Pagination and Sorting
export const getAllStartup = async (req, res, next) => {
  try {
    // Extract query parameters with default values
    const { page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = req.query;

    // Validate query parameters
    const pageNum = Math.max(1, parseInt(page)); // Ensure page is at least 1
    const pageSize = Math.max(1, Math.min(parseInt(limit), 100)); // Limit to a reasonable max
    const sortOrder = order === "desc" ? -1 : 1;

    // Build the filter based on the logged-in user
    const filter = req.user ? { userRef: req.user.id } : {};

    // Fetch startups with pagination and sorting
    const startups = await Startup.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);

    // Get total count of startups for pagination metadata
    const totalStartups = await Startup.countDocuments(filter);

    res.status(200).json({
      startups,
      totalStartups,
      totalPages: Math.ceil(totalStartups / pageSize),
      currentPage: pageNum,
    });
  } catch (error) {
    next(error); // Pass errors to error handling middleware
  }
};
