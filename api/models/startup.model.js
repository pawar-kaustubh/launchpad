import mongoose from "mongoose";
const startupSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    startupname: {
      type: String,
      required: true,
    },
    startupdesc: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    socials: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    totalsales: {
      type: Number,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },loss:{
        type: Number,
        required: true,
    },
    valuation: {
      type: Number,
      required: true,
    },
    equity: {
      type: Number,
      required: true,
    },
    pitchdeck: {
      type: String,
      required: true,
    },
    burnrate: {
      type: Number,
      required: true,
    },
    runway: {
      type: Number,
      required: true,
    },
    youtube: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Startup = mongoose.model("Startup", startupSchema);
export default Startup;
