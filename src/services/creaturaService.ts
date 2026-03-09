import { BASE_URL } from "./apiConfig";
import type { Creatura } from "../types/Creatura";

const CREATURA_ENDPOINT = `${BASE_URL}/Creatura`;

//GET creaturas from creatura api

export const getAllCreaturas = async (): Promise<Creatura[]> => {
  try {
    const response = await fetch(CREATURA_ENDPOINT);

    if (!response.ok) {
      throw new Error(`Creatura fetch failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching creaturas:", error);
    throw error;
  }
};


//Create new creatura after naming
export const createCreatura = async (
  newCreatura: Omit<Creatura, "id">
): Promise<Creatura> => {
  try {
    const response = await fetch(CREATURA_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCreatura),
    });

    if (!response.ok) {
      throw new Error(`Creatura creation failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating creatura:", error);
    throw error;
  }
};


//Update the name of the creatura 
export const updateCreatura = async (
  creatura: Creatura
): Promise<Creatura> => {
  try {
    const response = await fetch(
      `${CREATURA_ENDPOINT}/${creatura.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creatura),
      }
    );

    if (!response.ok) {
      throw new Error(`Creatura update failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating creatura:", error);
    throw error;
  }
};

//Delete Creatura
export const deleteCreatura = async (
  id: string
): Promise<void> => {
  try {
    const response = await fetch(
      `${CREATURA_ENDPOINT}/${id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error(`Creatura delete failed: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting creatura:", error);
    throw error;
  }
};