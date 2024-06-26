import ReactQuillProvider from "@/components/ReactQuillProvider";

const DiscussionDetail = () => {
  const answers = [
    {
      name: "Moh Agus Setiawan",
      date: "26 April 2023",
      profileImg: "https://picsum.photos/300/300",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    },
    {
      name: "Nina Lestari",
      date: "27 April 2023",
      profileImg: "https://picsum.photos/300/300",
      answer:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
    },
    {
      name: "Rian Hidayat",
      date: "28 April 2023",
      profileImg: "https://picsum.photos/300/300",
      answer:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
    },
    {
      name: "Siti Aisyah",
      date: "29 April 2023",
      profileImg: "https://picsum.photos/300/300",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="px-2 md:px-6 xl:px-10 pt-6">
      <div className="py-6 px-4 md:px-6 xl:px-8 bg-white rounded-lg">
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-3xl">The payment is cancelled because of compliance violation</h3>
          </div>
          <div className="flex text-sm gap-2">
            <img src="https://picsum.photos/300/300" alt="profile.jpg" className="w-6 h-6 rounded-full" />
            <h3>Ricky Raihan Setiawan</h3>
            <h6 className="text-gray-700">| Ditanya pada: 3 Hari Lalu</h6>
          </div>
          <hr className="border-gray-300 border-1 py-2" />
        </div>
        <div>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed felis dictum, venenatis ligula non, fringilla tellus. Donec blandit diam et nibh dictum faucibus. Aenean accumsan, nisi quis molestie porta, mi nisi convallis
            est, quis congue nisi ex sit amet mi. Nam condimentum consequat massa, non efficitur augue lobortis nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam faucibus felis felis, volutpat tempus quam lobortis id.
            Curabitur sed lorem eu orci tristique bibendum. Quisque ante nibh, tempor non rhoncus sed, volutpat in erat. Nulla facilisi. Donec tempus neque quis velit sodales tristique. Curabitur vulputate massa vitae lorem lobortis, in
            pellentesque lectus consectetur. Sed at metus fermentum, hendrerit tortor in, ultricies dolor. Proin sit amet blandit elit. Morbi a varius ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Praesent pharetra velit id cursus maximus. Curabitur pretium lorem arcu, sit amet fermentum nunc blandit sed. Curabitur vel ornare massa. Morbi et velit id erat pulvinar viverra vel vitae mauris. Nunc malesuada id purus
            at viverra. In orci massa, vulputate vitae dignissim sed, faucibus eu tortor. Nam vestibulum a dui a malesuada. Duis facilisis, augue vitae maximus feugiat, sapien eros ornare justo, ut mattis nulla nunc sed mauris. Nulla ut
            condimentum neque. Vestibulum nec mi ipsum. Aliquam ligula justo, iaculis non porttitor non, rutrum nec metus. Maecenas dignissim gravida placerat. Suspendisse tristique, risus sit amet ultricies iaculis, sapien nisi porta nibh,
            et tristique dui libero vitae nulla. Nulla nisl elit, pretium in sodales et, hendrerit in sem. Vestibulum felis lorem, commodo eget sem in, porta mollis metus. Donec nec luctus nisl, eget aliquam massa. Sed faucibus tincidunt
            ligula in eleifend. Cras sit amet luctus odio. Pellentesque pretium, libero nec ultricies euismod, eros lorem vulputate lacus, id ornare sem leo ut nulla. Integer commodo tincidunt augue. Fusce quis auctor eros. Nullam tempor
            pulvinar lorem a efficitur. Aliquam in nulla non massa luctus congue id sed orci. Ut quis iaculis urna. Praesent in ipsum arcu. Vestibulum porta justo sed nisi pharetra lacinia.
          </p>
        </div>
        {/* Map jawaban */}
        <div>
          <h3 className="my-6">4 Jawaban:</h3>
          {answers.map((answer, index) => (
            <div key={index} className="flex gap-4 mb-6">
              <img src={answer.profileImg} alt="profile.jpg" className="w-16 h-14 rounded-full" />
              <div>
                <h3>{answer.name}</h3>
                <h6 className="text-xs text-gray-700 mb-1">{answer.date}</h6>
                <p className="text-justify">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <hr className="border-gray-300 border-1 py-2" />
        {/* Form balasan */}
        <div className="mt-6">
          <h3 className="text-xl mb-4">Balas Jawaban:</h3>
          <form onSubmit={handleSubmit}>
            <div className="border p-2 rounded">
              <ReactQuillProvider value="blablabla" />
            </div>
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded text-end justify-end">
              Kirim
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;
