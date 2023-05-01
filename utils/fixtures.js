import fs from "fs";
import path from "path";

export const writeFixture = async (relativePath, data) => {
  const fixturePath = path.join(__dirname, relativePath);
  await fs.promises.writeFile(fixturePath, JSON.stringify(data, null, 2));
};

export const readFixture = async (relativePath) => {
  const fixturePath = path.join(__dirname, relativePath);
  return await fs.promises.readFile(fixturePath, "utf8");
};
