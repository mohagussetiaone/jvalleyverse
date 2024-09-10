import { useAuthValidation } from "@/lib/authValidation";

const ReviewDetail = () => {
  useAuthValidation();

  const users = [
    {
      name: "John Watson",
      date: "Nov 01, 2023",
      image: "https://pagedone.io/asset/uploads/1704349572.png",
      review:
        "One of the standout features of Pagedone is its intuitive and user-friendly interface. Navigating through the system feels natural, and the layout makes it easy to locate and utilize various design elements. This is particularly beneficial for designers looking to streamline their workflow.",
      rating: 5,
    },
    {
      name: "Jane Doe",
      date: "Oct 25, 2023",
      image: "https://pagedone.io/asset/uploads/1704349573.png",
      review: "Pagedone provides a seamless experience for both novice and experienced designers. The platform's versatility is unmatched, allowing me to create stunning visuals effortlessly.",
      rating: 4,
    },
    {
      name: "Mark Smith",
      date: "Sep 15, 2023",
      image: "https://pagedone.io/asset/uploads/1704349574.png",
      review: "The support team at Pagedone is outstanding. They are always ready to help and provide timely solutions. I highly recommend this platform to anyone in need of professional design tools.",
      rating: 3,
    },
    {
      name: "Lucy Adams",
      date: "Aug 10, 2023",
      image: "https://pagedone.io/asset/uploads/1704349575.png",
      review: "Pagedone's templates are a game-changer. They save me so much time and still allow for customization to fit my specific needs. The platform is a must-have for designers.",
      rating: 2,
    },
    {
      name: "Tom Hanks",
      date: "Jul 22, 2023",
      image: "https://pagedone.io/asset/uploads/1704349576.png",
      review: "The learning curve for Pagedone is virtually non-existent. It’s so easy to use that I was able to start creating professional designs right away. Great tool!",
      rating: 1,
    },
  ];

  return (
    <section className="py-10 relative bg-white dark:bg-background-900">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div className="w-full">
          <h2 className="font-manrope font-bold text-4xl text-black dark:text-neutral-200 mb-8 text-center">Our customer reviews</h2>
          <div>
            {users.map((user, index) => (
              <div key={index} className="pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <g clipPath="url(#clip0_13624_2892)">
                        <path
                          d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                          fill={i < user.rating ? "#FBBF24" : "#E5E7EB"}
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_13624_2892">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ))}
                </div>
                <div className="flex sm:items-center md:items-start flex-col min-[400px]:flex-row justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img src={user.image} alt={`${user.name} image`} className="w-8 h-8 rounded-full object-cover" />
                    <h6 className="font-semibold text-lg leading-8 text-indigo-600 ">{user.name}</h6>
                  </div>
                  <p className="font-normal text-sm text-gray-400">{user.date}</p>
                </div>
                <p className="font-normal text-lg leading-8 text-gray-400 max-xl:text-justify">{user.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewDetail;
