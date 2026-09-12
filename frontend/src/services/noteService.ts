import axios from "axios";
import type { Note } from "../types/Note";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


export const getNotes = async (): Promise<Note[]> => {
  const response = await api.get("/notes");

  return response.data;
};


export const getActiveNotes = async (): Promise<Note[]> => {
  const response = await api.get("/notes/active");

  return response.data;
};


export const getArchivedNotes = async (): Promise<Note[]> => {
  const response = await api.get("/notes/archived");

  return response.data;
};


export const createNote = async (
  title: string,
  content: string
): Promise<Note> => {

  const response = await api.post("/notes", {
    title,
    content,
  });

  return response.data;
};


export const updateNote = async (
  id: number,
  data: {
    title?: string;
    content?: string;
    archived?: boolean;
    categoryIds?: number[];
  }
): Promise<Note> => {

  const response = await api.put(
    `/notes/${id}`,
    data
  );

  return response.data;
};


export const deleteNote = async (
  id: number
): Promise<void> => {

  await api.delete(`/notes/${id}`);

};
