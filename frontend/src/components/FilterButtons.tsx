interface FilterButtonsProps {
  filter: "all" | "active" | "archived";
  setFilter: React.Dispatch<
    React.SetStateAction<"all" | "active" | "archived">
  >;
}

function FilterButtons({
  filter,
  setFilter,
}: FilterButtonsProps) {
  return (
    <div className="flex justify-center gap-3 mb-8">
      <button
        onClick={() => setFilter("all")}
        className={`px-4 py-2 rounded-lg text-white transition
        ${
          filter === "all"
            ? "bg-blue-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        All Notes
      </button>

      <button
        onClick={() => setFilter("active")}
        className={`px-4 py-2 rounded-lg text-white transition
        ${
          filter === "active"
            ? "bg-green-700"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Active
      </button>

      <button
        onClick={() => setFilter("archived")}
        className={`px-4 py-2 rounded-lg text-white transition
        ${
          filter === "archived"
            ? "bg-gray-900"
            : "bg-gray-700 hover:bg-gray-800"
        }`}
      >
        Archived
      </button>
    </div>
  );
}

export default FilterButtons;