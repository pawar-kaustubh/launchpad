import mongoose from "mongoose";
import { type } from "os";
const investorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  investmenttype: {
    type: String,
    required: true,
  },
  industriesinterested: {
    type: String,
    required: true,
  },
  fundinstage: {
    type: String,
    required: true,
  },
  maxamount: {
    type: Number,
    required: true,
  },
  minamount: {
    type: Number,
    required: true,
  },
  equityrange: {
    type: Number,
    required: true,
  },about:{
    type: String,
    required: true,
  },companiesinvested:{
    type: String,
    required: true,
  },isInvestor:{
    type:Boolean,
    default:true
  }
}, { timestamps: true });
const Investor = mongoose.model("Investor", investorSchema);
export default Investor;
