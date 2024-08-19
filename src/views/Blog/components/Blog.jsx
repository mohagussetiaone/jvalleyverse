const dummyData = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    author: "Moh Agus Setiawan",
    date: "04 April 2022",
    imgSrc: "https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur semua bila terjadi akan terbiasa bersama mu akan menjadi semua nya akan sirnah",
    author: "Moh Agus Setiawan",
    date: "04 April 2022",
    imgSrc: "https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet consectetur semua bila terjadi akan terbiasa bersama mu akan menjadi semua nya akan sirnah",
    author: "Moh Agus Setiawan",
    date: "04 April 2022",
    imgSrc: "https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const Blog = () => {
  return (
    <div className="w-full mx-auto px-14 py-8 bg-brand-50/20 dark:bg-background-900 dark:text-neutral-200">
      {dummyData.map((blog, index) => (
        <div key={blog.id} className={`shadow-lg bg-white rounded-lg dark:bg-gradient-to-r from-black via-background-900 to-background-600 p-6 cursor-pointer hover:bg-gray-200 ${index === 0 ? "mb-8" : "mb-4"}`}>
          {index === 0 ? (
            <div>
              <div className="text-center">
                <h3 className="text-5xl pb-4">Our News</h3>
                <h6 className="py-8">{blog.description}</h6>
              </div>
              <div>
                <img src={blog.imgSrc} alt="banner.img" className="w-full h-[350px]" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-medium py-2">{blog.title}</h2>
                <div className="flex items-center text-sm gap-2 text-gray-800">
                  <p>{blog.author}</p>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-800 mt-1"></span>
                  <p>{blog.date}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:items-start rounded-lg xl:flex-row hover:bg-gray-100 cursor-pointer dark:border-gray-900 dark:bg-gray-800 dark:hover:bg-slate-600">
              <div className="w-full min-w-[11rem] xl:w-52 xl:h-44">
                <img className="w-full h-full sm:h-48 object-contain rounded-t-lg md:rounded-none md:rounded-s-lg" src={blog.imgSrc} />
              </div>
              <div className="flex flex-col justify-center h-full p-4 align-middle">
                <h2 className="text-2xl line-clamp-3 overflow-hidden text-ellipsis font-medium py-2 text-justify">{blog.title}</h2>
                <div className="text-sm gap-2 text-gray-800">
                  <div className="flex gap-2">
                    <p>{blog.author}</p>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-800 mt-2"></span>
                    <p>{blog.date}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Blog;
