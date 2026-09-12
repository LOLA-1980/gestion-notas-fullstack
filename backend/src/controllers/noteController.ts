import { Request, Response } from "express";
import { NoteService } from "../services/noteService";

const noteService = new NoteService();

export class NoteController {

  async getNotes(_req: Request, res: Response) {
    try {
      const notes = await noteService.getNotes();
      res.json(notes);
    } catch (error) {
      res.status(500).json({
        message: "Error getting notes",
      });
    }
  }


  async getActiveNotes(_req: Request, res: Response) {
    try {
      const notes = await noteService.getActiveNotes();
      res.json(notes);
    } catch (error) {
      res.status(500).json({
        message: "Error getting active notes",
      });
    }
  }


  async getArchivedNotes(_req: Request, res: Response) {
    try {
      const notes = await noteService.getArchivedNotes();
      res.json(notes);
    } catch (error) {
      res.status(500).json({
        message: "Error getting archived notes",
      });
    }
  }


  async getNoteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid id",
        });
      }

      const note = await noteService.getNoteById(id);

      if (!note) {
        return res.status(404).json({
          message: "Note not found",
        });
      }

      res.json(note);

    } catch (error) {
      res.status(500).json({
        message: "Error getting note",
      });
    }
  }

  async getNotesByCategory(
    req: Request,
    res: Response
  ) {
    const categoryId = Number(req.params.categoryId);

    const notes =
      await noteService.getNotesByCategory(
        categoryId
      );

    res.json(notes);
  }


  async createNote(req: Request, res: Response) {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({
          message: "Title and content are required",
        });
      }

      const note = await noteService.createNote(
        title,
        content
      );

      res.status(201).json(note);

    } catch (error) {
      res.status(500).json({
        message: "Error creating note",
      });
    }
  }


  async updateNote(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid id",
        });
      }

      // 👇 Agrega esta línea
    console.log("BODY:", req.body);
    

      const note = await noteService.updateNote(
        id,
        req.body
      );

      res.json(note);

    } catch (error) {
      res.status(500).json({
        message: "Error updating note",
      });
    }
  }

  async addCategory(req: Request, res: Response) {

    const noteId = Number(req.params.id);

    const { categoryId } = req.body;

    const note = await noteService.addCategory(
      noteId,
      categoryId
    );

    res.json(note);

  }

  async removeCategory(req: Request, res: Response) {

    const noteId = Number(req.params.id);

    const { categoryId } = req.body;

    const note = await noteService.removeCategory(
      noteId,
      categoryId
    );

    res.json(note);

  }


  async deleteNote(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid id",
        });
      }

      await noteService.deleteNote(id);

      res.status(204).send();

    } catch (error) {
      res.status(500).json({
        message: "Error deleting note",
      });
    }
  }
}