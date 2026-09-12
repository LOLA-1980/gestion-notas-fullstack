import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { NoteController } from "../controllers/noteController";

const router = Router();

const categoryController = new CategoryController();
const noteController = new NoteController();

router.get("/", (req, res) =>
  categoryController.getCategories(req, res)
);

router.post("/", (req, res) =>
  categoryController.createCategory(req, res)
);

router.delete("/:id", (req, res) =>
  categoryController.deleteCategory(req, res)
);

router.get(
  "/:categoryId/notes",
  (req, res) =>
    noteController.getNotesByCategory(req, res)
);

export default router;