import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import scss from "rollup-plugin-scss";
import svg from "rollup-plugin-svg";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";

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
      alias({
        entries: [
          { find: "#minpath", replacement: "vfile/lib/minpath.browser.js" },
        ],
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules",
        presets: ["@babel/preset-react"],
      }),
      scss(),
      external(),
      resolve({
        browser: true, // prefer browser builds
        exportConditions: ["browser", "default"],
        preferBuiltins: false,
      }),
      terser(),
      svg(),
      image(),
      json(),
      commonjs(),
    ],
  },
];
