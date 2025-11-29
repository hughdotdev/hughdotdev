import fs from "fs";
import path from "path";
import { cache } from "react";

const CONTENT_DIR = "content";

export const readContentFile = cache((filename: string): string => {
  const filePath = path.join(process.cwd(), CONTENT_DIR, filename);
  return fs.readFileSync(filePath, "utf-8");
});
