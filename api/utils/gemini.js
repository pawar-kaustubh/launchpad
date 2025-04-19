import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

// Initialize GoogleGenerativeAI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the askGeminiInvestor function
const askGeminiInvestor = async (startupData) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Creating a prompt for the AI investor
  const prompt = `
    Act as an AI investor. You are given the following startup data:
    Name: ${startupData.name}
    Description: ${startupData.description}
    Founder Info: ${startupData.founderInfo}
    Financials: ${startupData.financials}
    Evaluate the investment potential of this startup.
  `;

  // Get the response from the generative model
  const result = await model.generateContent({ prompt });
  const response = result.response.text();

  return response;
};

// Export the function as default
export { askGeminiInvestor };
