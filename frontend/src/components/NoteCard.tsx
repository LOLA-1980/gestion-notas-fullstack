import type { Note } from "../types/Note";

interface NoteCardProps {
  note: Note;

  onEdit: (note: Note) => void;

  onDelete: (id: number) => void;

  onArchive: (note: Note) => void;
}

function NoteCard({
  note,
  onEdit,
  onDelete,
  onArchive,
}: NoteCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-5">

      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {note.title}
      </h3>

      <p className="text-gray-600 mb-4 whitespace-pre-line">
        {note.content}
      </p>

      {/* Categories */}

      {note.categories.length > 0 && (

        <div className="mb-4">

          <p className="text-sm font-semibold text-gray-700 mb-2">
            Categories
          </p>

          <div className="flex flex-wrap gap-2">

            {note.categories.map((category) => (

              <span
                key={category.id}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {category.name}
              </span>

            ))}

          </div>

        </div>

      )}

      <span
        className={
          note.archived
            ? "inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
            : "inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
        }
      >
        {note.archived ? "📦 Archived" : "✅ Active"}
      </span>

      <div className="flex gap-3 mt-5">

        <button
          onClick={() => onEdit(note)}
          className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500"
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => onArchive(note)}
          className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
        >
          {note.archived ? "↩️ Restore" : "📦 Archive"}
        </button>

        <button
          onClick={() => onDelete(note.id)}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default NoteCard;
