import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import scss from 'rollup-plugin-scss'

export default [
  {
    input: "./src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules",
        presets: ["@babel/preset-react"],
      }),
      scss(),
      external(),
      resolve(),
      terser(),
    ],
  },
];
