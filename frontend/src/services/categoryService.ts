import axios from "axios";
import type { Category } from "../types/Category";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};

export const addCategoryToNote = async (
  noteId: number,
  categoryId: number
): Promise<void> => {
  await api.post(`/notes/${noteId}/categories`, {
    categoryId,
  });
};

export const removeCategoryFromNote = async (
  noteId: number,
  categoryId: number
): Promise<void> => {
  await api.delete(`/notes/${noteId}/categories`, {
    data: {
      categoryId,
    },
  });
};