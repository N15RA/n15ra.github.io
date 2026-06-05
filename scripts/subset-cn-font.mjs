// 內容驅動的中文字體子集化。
//
// 掃描 src/ 內所有實際用到的非拉丁字元（CJK + 全形標點 + 箭頭等），從
// Maple Mono NF CN 原始字檔（Regular / Bold）產生精簡 woff2，輸出到
// public/fonts/maple-mono-cn/。產出的 woff2 會 commit 進 repo；原始字檔
// （.cache/fonts/*.ttf，約 20MB 各）不 commit。
//
// 取得原始字檔（一次性）：
//   curl -sL -o .cache/fonts/maple-nf-cn.zip \
//     https://github.com/subframe7536/maple-font/releases/download/v7.9/MapleMono-NF-CN-unhinted.zip
//   unzip -o -j .cache/fonts/maple-nf-cn.zip \
//     "MapleMono-NF-CN-Regular.ttf" "MapleMono-NF-CN-Bold.ttf" -d .cache/fonts/
//
// 新增不同中文字後，重跑 `npm run font:subset` 即可（Noto Sans TC 為保底，
// 萬一漏字也不會出現豆腐字）。

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import subsetFont from "subset-font";

const SRC_DIR = "src";
const SRC_EXT = new Set([".astro", ".ts", ".js", ".mjs", ".md", ".json"]);
const OUT_DIR = "public/fonts/maple-mono-cn";
const SOURCES = [
  { in: ".cache/fonts/MapleMono-NF-CN-Regular.ttf", out: "MapleMonoNFCN-Regular.subset.woff2" },
  { in: ".cache/fonts/MapleMono-NF-CN-Bold.ttf", out: "MapleMonoNFCN-Bold.subset.woff2" },
];

// 一定保留的標點/符號（保底，即使某次掃描沒掃到）。
const BASE_CHARS = "、。，「」『』（）〈〉《》【】〔〕—…─·／｜：；！？％＃＠＆＊＋－＝～→←↑↓↗↘";

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (SRC_EXT.has(extname(p))) files.push(p);
  }
  return files;
}

function collectChars() {
  const set = new Set();
  for (const ch of BASE_CHARS) set.add(ch);
  for (const file of walk(SRC_DIR)) {
    for (const ch of readFileSync(file, "utf8")) {
      const cp = ch.codePointAt(0);
      // 收集所有非拉丁字元（CJK 統一表意、擴充、全形標點、箭頭、破折號等），
      // 並補上希臘/西里爾字母（如舊站原文顏文字 ヾ(*ΦωΦ)ツ 的 Φ、ω）。
      if (cp > 0x2000 || (cp >= 0x0370 && cp <= 0x04ff)) set.add(ch);
    }
  }
  return [...set].sort().join("");
}

const chars = collectChars();
console.log(`收集到 ${[...chars].length} 個非拉丁字元，開始子集化…`);

mkdirSync(OUT_DIR, { recursive: true });
for (const s of SOURCES) {
  if (!existsSync(s.in)) {
    console.error(`\n找不到原始字檔：${s.in}`);
    console.error("請先依本檔頂部註解下載 Maple Mono NF CN（subframe7536/maple-font，OFL）。\n");
    process.exit(1);
  }
  const subset = await subsetFont(readFileSync(s.in), chars, { targetFormat: "woff2" });
  writeFileSync(join(OUT_DIR, s.out), subset);
  console.log(`  ✓ ${s.out}  (${(subset.length / 1024).toFixed(1)} KB)`);
}
console.log("完成。");
