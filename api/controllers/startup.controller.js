import Startup from "../models/startup.model.js";


export const createStartup = async (req, res, next) => {
    try {
      const startup = await Startup.create(req.body);
      return res.status(201).json(Startup);
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