import { getCategories } from "@/services/setting/get-categories.";

export const CategoriesList = async () => {
  const categories = await getCategories();

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
        <p className="text-gray-600">
          No categories available. Please add a new category.
        </p>
      </div>
    );
  }

  return (
    <>
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: cat.color || "#ccc" }}
            />
            <div>
              <p className="font-semibold">{cat.name}</p>
              <p className="text-sm text-gray-500">{cat.description}</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            {cat.subcategories?.length ?? 0} subcategories
          </p>
        </div>
      ))}
    </>
  );
};
