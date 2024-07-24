const SidebarSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 }, (_, index) => <li key={index} className="w-full h-10 bg-gray-200 rounded-md dark:bg-neutral-700"></li>);

  return (
    <div className="flex animate-pulse">
      <div className="mt-2 w-full">
        <ul className="mt-5 space-y-3">{skeletonItems}</ul>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
