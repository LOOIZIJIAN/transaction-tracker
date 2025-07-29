export const CategoriesSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-gray-200 p-4 rounded-lg animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="flex flex-col gap-2">
              <div className="w-32 h-4 bg-gray-300 rounded" />
              <div className="w-24 h-3 bg-gray-300 rounded" />
            </div>
          </div>
          <div className="w-16 h-4 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
};
