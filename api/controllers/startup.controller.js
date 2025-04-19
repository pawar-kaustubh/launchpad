import Startup from "../models/startup.model.js";


export const createStartup = async (req, res, next) => {
    try {
      const startup = await Startup.create(req.body);
      return res.status(201).json(Startup);
    } catch (error) {
      next(error);
    }
  };