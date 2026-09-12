import { NoteRepository } from "../repositories/noteRepository";

export class NoteService {

  private noteRepository: NoteRepository;

  constructor() {
    this.noteRepository = new NoteRepository();
  }

  async getNotes() {
    return this.noteRepository.findAll();
  }

  async getActiveNotes() {
    return this.noteRepository.findActive();
  }

  async getArchivedNotes() {
    return this.noteRepository.findArchived();
  }

  async getNoteById(id: number) {
    return this.noteRepository.findById(id);
  }

  async getNotesByCategory(categoryId: number) {
    return this.noteRepository.findByCategory(categoryId);
  }

  async createNote(
    title: string,
    content: string
  ) {
    return this.noteRepository.create({
      title,
      content,
    });
  }

  async updateNote(
    id: number,
    data: {
      title?: string;
      content?: string;
      archived?: boolean;
    }
  ) {
    return this.noteRepository.update(id, data);
  }

  async addCategory(
    noteId: number,
    categoryId: number
  ) {
    return this.noteRepository.addCategory(
      noteId,
      categoryId
    );
  }

  async removeCategory(
    noteId: number,
    categoryId: number
  ) {
    return this.noteRepository.removeCategory(
      noteId,
      categoryId
    );
  }

  async deleteNote(id: number) {
    return this.noteRepository.delete(id);
  }
}