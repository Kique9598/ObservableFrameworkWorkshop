import { csvParse, csvFormat } from "d3-dsv";
import { readFileSync } from "fs";

const raw = readFileSync("./src/data/life-expectancy.csv", "utf-8");
const rows = csvParse(raw);
const filtered = rows.filter(d => d.Year === "2010");

process.stdout.write(csvFormat(filtered));