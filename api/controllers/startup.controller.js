import { start } from "repl";
import Startup from "../models/startup.model.js";
import { errorHandler } from "../utils/error.js";

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