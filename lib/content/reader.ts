import fs from "fs";
import path from "path";

const CONTENT_DIR = "content";

export function readContentFile(filename: string): string {
  const filePath = path.join(process.cwd(), CONTENT_DIR, filename);
  return fs.readFileSync(filePath, "utf-8");
}
