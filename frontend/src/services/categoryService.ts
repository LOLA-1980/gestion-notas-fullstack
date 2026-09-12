import axios from "axios";
import type { Category } from "../types/Category";
import type { Note } from "../types/Note";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories");

  return response.data;
};

export const createCategory = async (
  name: string
): Promise<Category> => {
  const response = await api.post("/categories", {
    name,
  });

  return response.data;
};

export const getNotesByCategory = async (
  categoryId: number
): Promise<Note[]> => {
  const response = await api.get(
    `/categories/${categoryId}/notes`
  );

  return response.data;
};

export const addCategoryToNote = async (
  noteId: number,
  categoryId: number
): Promise<Note> => {
  const response = await api.post(
    `/notes/${noteId}/categories`,
    {
      categoryId,
    }
  );

  return response.data;
};

export const removeCategoryFromNote = async (
  noteId: number,
  categoryId: number
): Promise<Note> => {
  const response = await api.delete(
    `/notes/${noteId}/categories`,
    {
      data: {
        categoryId,
      },
    }
  );

  return response.data;
};
