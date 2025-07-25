import { TitleBar } from "../../setting-page/title-bar";
import { AddNewButton } from "./add-new-button";

export const Categories = () => {
  return (
    <div className="w-[1250px] h-full flex flex-col mx-18 mt-6 fixed">
      <div className="bg-gray-200 rounded-sm w-[1250px] p-4 flex justify-between">
        <TitleBar title="Categories" />
        <AddNewButton />
      </div>

      <div className="p-2 overflow-y-auto flex flex-col gap-4 border-2 border-black rounded-lg h-[calc(100vh-200px)] mt-2">
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full border-2 border-black rounded-lg p-4 bg-amber-100">
          <p className="text-gray-600">
            No categories available. Please add a new category.
          </p>
        </div>
        {/* Additional categories can be rendered here */}
      </div>
    </div>
  );
};
