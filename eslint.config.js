import eslintConfig from "@moritz-grimm/eslint-config";
import { globalIgnores } from "eslint/config";

export default [
    ...eslintConfig,
    globalIgnores([".docusaurus/"]),
];
