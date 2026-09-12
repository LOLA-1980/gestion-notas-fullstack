import { useCallback, useEffect, useState } from "react";

import {
  getNotes,
  getActiveNotes,
  getArchivedNotes,
  createNote,
  deleteNote,
  updateNote,
} from "./services/noteService";

import type { Note } from "./types/Note";

import FilterButtons from "./components/FilterButtons";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";

import type { Category } from "./types/Category";

import {
  getCategories,
  addCategoryToNote,
} from "./services/categoryService";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [filter, setFilter] = useState<
    "all" | "active" | "archived"
  >("all");

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);


  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let data: Note[];

      if (filter === "active") {
        data = await getActiveNotes();
      } else if (filter === "archived") {
        data = await getArchivedNotes();
      } else {
        data = await getNotes();
      }

      setNotes(data);

    } catch (error) {
      console.error(error);
      setError("Unable to load notes.");

    } finally {
      setLoading(false);
    }
  }, [filter]);



  const loadCategories = useCallback(async () => {
    try {

      const data = await getCategories();

      setCategories(data);

    } catch (error) {

      console.error(error);

      setError("Unable to load categories.");

    }
  }, []);

  useEffect(() => {
    // Loading remote data on mount/filter change is the intended side effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNotes();
  }, [loadNotes]);

  useEffect(() => {
    // Loading remote data on mount is the intended side effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCategories();
  }, [loadCategories]);


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();


    if (!title.trim() || !content.trim()) {
      alert("Please complete all fields.");
      return;
    }


    try {

      setSaving(true);


      if (editingId !== null) {


        console.log("selectedCategories:", selectedCategories);

        await updateNote(editingId, {
          title,
          content,
          categoryIds: selectedCategories,
        });



      } else {

       const newNote = await createNote(
        title,
        content
      );


      for (const categoryId of selectedCategories) {

        await addCategoryToNote(
          newNote.id,
          categoryId
        );

      }
    }


      clearForm();

      setSelectedCategories([]);

      loadNotes();


    } catch (error) {

      console.error(error);
      setError("Unable to save note.");

    } finally {

      setSaving(false);

    }

  };



 const handleEdit = (note: Note) => {

  console.log("Editing note:", note);

  setTitle(note.title);

  setContent(note.content);

  setEditingId(note.id);

  setSelectedCategories(
    note.categories.map(
      (category) => category.id
    )
  );

};



  const handleDelete = async (id: number) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this note?"
      )
    ) {
      return;
    }


    await deleteNote(id);

    loadNotes();

  };



  const handleArchive = async (note: Note) => {

    await updateNote(note.id, {
      archived: !note.archived,
    });


    loadNotes();

  };



  const clearForm = () => {

    setTitle("");

    setContent("");

    setEditingId(null);

    setSelectedCategories([]);

  };



  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto px-5">


        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          📝 Notes App
        </h1>



        {error && (

          <div className="mb-6 rounded-lg bg-red-100 border border-red-300 text-red-700 p-4">

            {error}

          </div>

        )}




        <FilterButtons
          filter={filter}
          setFilter={setFilter}
        />




        <NoteForm
          title={title}
          content={content}
          editing={editingId !== null}
          saving={saving}
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          setTitle={setTitle}
          setContent={setContent}
          onSubmit={handleSubmit}
          onCancel={clearForm}
        />




        {loading ? (

          <div className="flex justify-center py-12">

            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          </div>


        ) : notes.length === 0 ? (

          <p className="text-center text-gray-500">
            No notes found.
          </p>


        ) : (

          notes.map((note) => (

            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />

          ))

        )}


      </div>

    </div>

  );

}


export default App;
