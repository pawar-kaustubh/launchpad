import Investor from "../models/investor.model.js";

export const createInvestor = async (req, res, next) => {   
  try {
    const investor = await Investor.create({
      ...req.body,
      userRef: req.user.id,
    });
    return res.status(201).json(investor);
  } catch (error) {
    next(error);
  }
};  