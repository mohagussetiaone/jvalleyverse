import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/roadmap", changefreq: "weekly", priority: 0.8 },
  { url: "/tentang", changefreq: "monthly", priority: 0.8 },
  { url: "/show-case", changefreq: "weekly", priority: 0.8 },
  { url: "/show-case/buat-show-case", changefreq: "monthly", priority: 0.7 },
  { url: "/profile", changefreq: "monthly", priority: 0.7 },
  { url: "/settings", changefreq: "monthly", priority: 0.7 },
  { url: "/faq", changefreq: "monthly", priority: 0.7 },
  { url: "/signin", changefreq: "monthly", priority: 0.7 },
  { url: "/signup", changefreq: "monthly", priority: 0.7 },
];

const sitemap = new SitemapStream({ hostname: "https://jvalleyverse.vercel.app/" });

streamToPromise(sitemap)
  .then((data) => createWriteStream("./public/sitemaps.xml").write(data))
  .catch((err) => console.error(err));

links.forEach((link) => sitemap.write(link));
sitemap.end();
