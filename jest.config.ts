import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  verbose: true,
  moduleFileExtensions: ["ts", "js", "mjs", "cjs", "json", "node", ".d.ts"],
};

export default config;
