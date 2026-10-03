import { resolve } from "node:path";
import { 模拟 } from "./simulator";

const 根目录 = process.cwd();

console.log(
	模拟("bsiaie", "snow_sipin", resolve(根目录, "../rime-snow-pinyin")),
);
