const LoadingPlaceholder = () => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 animate-pulse">
      <div className="aspect-square rounded-xl bg-gray-200 relative">
        <div className="w-full h-full bg-gray-300 rounded-md"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="h-5 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
};

export default LoadingPlaceholder;
