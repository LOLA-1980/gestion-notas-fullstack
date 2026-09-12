import type { FormEvent } from "react";
import type { Category } from "../types/Category";


interface NoteFormProps {

  title: string;

  content: string;

  editing: boolean;

  saving: boolean;

  categories: Category[];

  selectedCategories: number[];

  setSelectedCategories: React.Dispatch<
    React.SetStateAction<number[]>
  >;

  setTitle: React.Dispatch<
    React.SetStateAction<string>
  >;

  setContent: React.Dispatch<
    React.SetStateAction<string>
  >;

  onSubmit: (
    e: FormEvent<HTMLFormElement>
  ) => void;

  onCancel: () => void;

}



function NoteForm({

  title,
  content,
  editing,
  saving,
  categories,
  selectedCategories,
  setSelectedCategories,
  setTitle,
  setContent,
  onSubmit,
  onCancel,

}: NoteFormProps) {


  const handleCategoryChange = (
    categoryId: number
  ) => {

    setSelectedCategories((previous) => {

      if (previous.includes(categoryId)) {

        return previous.filter(
          (id) => id !== categoryId
        );

      }


      return [
        ...previous,
        categoryId,
      ];

    });

  };



  return (

    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col gap-4"
    >


      <input

        type="text"

        placeholder="Title"

        value={title}

        onChange={(e) =>
          setTitle(e.target.value)
        }

        disabled={saving}

        className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"

      />



      <textarea

        rows={4}

        placeholder="Content"

        value={content}

        onChange={(e) =>
          setContent(e.target.value)
        }

        disabled={saving}

        className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"

      />



      {/* Categories */}

      {categories.length > 0 && (

        <div>

          <p className="font-semibold text-gray-700 mb-2">
            Categories
          </p>


          <div className="flex flex-wrap gap-3">

            {categories.map((category) => (

              <label
                key={category.id}
                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
              >

                <input

                  type="checkbox"

                  checked={
                    selectedCategories.includes(
                      category.id
                    )
                  }

                  onChange={() =>
                    handleCategoryChange(
                      category.id
                    )
                  }

                  disabled={saving}

                />


                {category.name}

              </label>

            ))}

          </div>

        </div>

      )}





      <button

        type="submit"

        disabled={saving}

        className={`py-3 rounded-lg font-semibold text-white transition

          ${
            saving

              ? "bg-gray-400 cursor-not-allowed"

              : "bg-blue-600 hover:bg-blue-700"

          }

        `}

      >

        {saving

          ? "Saving..."

          : editing

            ? "Update Note"

            : "Save Note"}

      </button>





      {editing && (

        <button

          type="button"

          onClick={onCancel}

          disabled={saving}

          className="bg-gray-300 py-3 rounded-lg hover:bg-gray-400 disabled:bg-gray-200"

        >

          Cancel Edit

        </button>

      )}



    </form>

  );

}


export default NoteForm;
