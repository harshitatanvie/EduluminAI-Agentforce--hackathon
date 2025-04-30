import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import axios from "axios";

export const analyzeSkills = async (inputText: string) => {
  try {
    const response = await axios.post(
      "https://orgfarm-f771c229b3-dev-ed.develop.lightning.force.com", // Replace with your endpoint
      {
        input: inputText,
      },
      {
        headers: {
          Authorization: "Bearer 0XxgL000000IfSvSAK", // Use .env for security
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.output;
  } catch (error) {
    console.error("Skill Analysis Error:", error);
    throw error;
  }
};
