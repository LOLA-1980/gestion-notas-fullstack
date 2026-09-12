import axios from "axios";
import type { Note } from "../types/Note";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type UpdateNoteData = {
  title?: string;
  content?: string;
  archived?: boolean;
  categoryIds?: number[];
};

export const getNotes = async (): Promise<Note[]> => {
  const response = await api.get<Note[]>("/notes");
  return response.data;
};

export const getActiveNotes = async (): Promise<Note[]> => {
  const response = await api.get<Note[]>("/notes/active");
  return response.data;
};

export const getArchivedNotes = async (): Promise<Note[]> => {
  const response = await api.get<Note[]>("/notes/archived");
  return response.data;
};

export const createNote = async (
  title: string,
  content: string
): Promise<Note> => {
  const response = await api.post<Note>("/notes", {
    title,
    content,
  });

  return response.data;
};

export const updateNote = async (
  id: number,
  data: UpdateNoteData
): Promise<Note> => {
  const response = await api.put<Note>(`/notes/${id}`, data);
  return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await api.delete(`/notes/${id}`);
};