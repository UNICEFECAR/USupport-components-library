import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import scss from 'rollup-plugin-scss'
import svg from 'rollup-plugin-svg'
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "./src/index.js",
    output: [
      {
        dir: "dist",
        format: "cjs",
        preserveModules: true,
      },
      {
        dir: "dist",
        format: "es",
        preserveModules: true,
      },
    ],
    plugins: [
      external({ includeDependencies: true, }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules",
        presets: ["@babel/preset-react"],
      }),
      scss(),
      resolve(),
      terser(),
      svg(),
      image(),
      json(),
      commonjs(),
    ],
  },
];
