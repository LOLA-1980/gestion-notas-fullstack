import { Router } from "express";
import { NoteController } from "../controllers/noteController";

const router = Router();

const noteController = new NoteController();

router.get("/", (req, res) =>
  noteController.getNotes(req, res)
);

router.get("/active", (req, res) =>
  noteController.getActiveNotes(req, res)
);

router.get("/archived", (req, res) =>
  noteController.getArchivedNotes(req, res)
);

router.get("/:id", (req, res) =>
  noteController.getNoteById(req, res)
);

router.post("/", (req, res) =>
  noteController.createNote(req, res)
);

router.put("/:id", (req, res) =>
  noteController.updateNote(req, res)
);

router.delete("/:id", (req, res) =>
  noteController.deleteNote(req, res)
);

router.post("/:id/categories", (req, res) =>
  noteController.addCategory(req, res)
);

router.delete("/:id/categories", (req, res) =>
  noteController.removeCategory(req, res)
);

export default router;