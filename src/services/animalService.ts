import { BASE_URL } from "./apiConfig";
import type { Animal } from "../types/Animal";

const ANIMALS_ENDPOINT = `${BASE_URL}/Animals`;

export const getAllAnimals = async (): Promise<Animal[]> => {
  try {
    const response = await fetch(ANIMALS_ENDPOINT);

    if (!response.ok) {
      throw new Error(`Animal fetch failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching animals:", error);
    throw error; // re-throw so component can handle it
  }
};