// Tell Bing, Yandex and other IndexNow engines about every URL in the sitemap.
// Run after uploading a new build:  node scripts/indexnow.mjs
// (Bing's index also feeds ChatGPT search and Copilot.)
import fs from "node:fs";

const HOST = "zerocard.pro";
const KEY = "8049633624651009799fdbe839982dd9";
const sitemap = fs.readFileSync(new URL("../dist/sitemap.xml", import.meta.url), "utf-8");
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: sent ${urlList.length} URLs, HTTP ${res.status}`);
if (res.status === 200 || res.status === 202) console.log("Accepted. Bing and Yandex will recrawl these pages.");
else console.log(await res.text());
