import Fuse from "fuse.js";
import { useState } from "react";
import Accordion from "./Accordion";
import Input from "./Input";

const isiFAQ = [
  {
    pertanyaan: "Bagaimana cara memesan layanan Internet?",
    jawaban: "Anda dapat memesan layanan internet kami dengan mengunjungi situs web kami di nethome.id dan memilih paket yang sesuai dengan kebutuhan Anda. Proses pemesanan kami sederhana dan mudah diikuti.",
  },
  {
    pertanyaan: "Berapa lama waktu pemasangan layanan internet?",
    jawaban: "Pemasangan layanan internet akan dilakukan sesuai dengan jadwal yang telah diajukan oleh Anda dan penyesuaian jadwal kami.",
  },
  {
    pertanyaan: "Bagaimana cara menghubungi dukungan pelanggan?",
    jawaban: "Anda bisa mengakses di sini: https://nethome.id/bantuan atau klik tulisan Bantuan di bawah layar Anda.",
  },
  {
    pertanyaan: "Bagaimana saya dapat mengelola langganan internet saya?",
    jawaban:
      "Anda dapat mengelola langganan internet Anda di menu langganan, lalu pilih layanan yang Anda ingin kelola, lalu klik kelola layanan. Mulai dari pengajuan Upgrade, Downgrade, Relokasi, Ubah Rencana Pembayaran hingga Berhenti Berlangganan, semuanya bisa dilakukan dengan mudah.",
  },
  {
    pertanyaan: "Bagaimana cara melakukan pembayaran tagihan internet saya?",
    jawaban: "Anda dapat melakukan pembayaran yang terdaftar di tagihan Anda, dengan memilih metode pembayaran yang tersedia. Kami juga menyediakan pembayaran via QRIS atau transfer virtual bank.",
  },
];

const fuse = new Fuse(isiFAQ, {
  keys: ["pertanyaan", "jawaban"],
  includeScore: true,
  threshold: 0.4,
});

const FaqCard = () => {
  const [searchResults, setSearchResults] = useState(isiFAQ);
  const handleSearch = (event) => {
    const keyword = event.target.value;
    if (keyword === "") {
      setSearchResults(isiFAQ);
    } else {
      const results = fuse.search(keyword);
      setSearchResults(results.map((result) => result.item));
    }
  };

  return (
    <div className="bg-white dark:bg-primaryDark px-4 md:px-48 py-10">
      <Input handleSearch={handleSearch} />
      <Accordion isiFAQ={searchResults} />
    </div>
  );
};

export default FaqCard;
