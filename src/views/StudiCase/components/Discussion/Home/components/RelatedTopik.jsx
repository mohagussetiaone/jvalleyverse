import { Link } from "react-router-dom";

const RelatedTopik = () => {
  const topics = [
    { id: 1, title: "Kesulitan dalam men debug aplikasi", url: "/belajar/diskusi/1" },
    { id: 2, title: "Bagaimana cara state bekerja pada aplikasi", url: "/belajar/diskusi/2" },
    { id: 3, title: "Backend error pada aplikasi", url: "/belajar/diskusi/3" },
    { id: 4, title: "Mengenal konsep hooks pada React", url: "/belajar/diskusi/4" },
    { id: 5, title: "Implementasi Redux dalam aplikasi", url: "/belajar/diskusi/5" },
    { id: 6, title: "Perbedaan antara var, let, dan const", url: "/belajar/diskusi/6" },
    { id: 7, title: "Cara menggunakan useEffect dengan benar", url: "/belajar/diskusi/7" },
    { id: 8, title: "Optimasi performa pada aplikasi React", url: "/belajar/diskusi/8" },
    { id: 9, title: "Handling Asynchronous Code di JavaScript", url: "/belajar/diskusi/9" },
    { id: 10, title: "Pemahaman tentang closure di JavaScript", url: "/belajar/diskusi/10" },
    { id: 11, title: "Memahami konteks this di JavaScript", url: "/belajar/diskusi/11" },
    { id: 12, title: "Desain pattern pada pengembangan aplikasi", url: "/belajar/diskusi/12" },
    { id: 13, title: "Testing dan debugging pada aplikasi", url: "/belajar/diskusi/13" },
    { id: 14, title: "Penggunaan CSS-in-JS pada React", url: "/belajar/diskusi/14" },
    { id: 15, title: "Membangun aplikasi dengan Next.js", url: "/belajar/diskusi/15" },
  ];

  return (
    <div className="bg-neutral-300/50 dark:bg-black/30 rounded-md">
      <div className="text-start rounded-t-lg p-2 md:pl-4">
        <p className="text-base text-black dark:text-neutral-200">Topik Related</p>
      </div>
      <div className="bg-white dark:bg-brand2/50 p-2 rounded-b-md">
        {topics.map((topic, index) => (
          <div key={topic.id} className={`p-2 text-black flex text-start justify-start ${(index + 1) % 5 === 0 ? "border-b border-gray-300" : ""}`}>
            <ol className="text-sm text-blue-600 dark:text-neutral-200">
              <li className="cursor-pointer">
                <Link to={topic.url}>{topic.title}</Link>
              </li>
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedTopik;
