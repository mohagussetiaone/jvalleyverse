const ErrorServer = () => {
  return (
    <div className="bg-primarydark px-2 text-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-extrabold text-gray-800 dark:text-brand-500">500</h1>
        <p className="text-4xl font-medium text-gray-800 dark:text-neutral-200">Internal Server Error</p>
        <p className="text-xl text-gray-800 mt-4 dark:text-neutral-200">We apologize for the inconvenience. Please try again later.</p>
      </div>
    </div>
  );
};

export default ErrorServer;
