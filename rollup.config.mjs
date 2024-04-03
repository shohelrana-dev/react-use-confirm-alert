import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import autoprefixer from 'autoprefixer'
import { dts } from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss-modules'
import { terser } from 'rollup-plugin-terser'

// This is required to read package.json file when
// using Native ES modules in Node.js
import { createRequire } from 'node:module'
const requireFile = createRequire(import.meta.url)
const packageJson = requireFile('./package.json')

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                exports: 'named',
            },
            {
                file: packageJson.module,
                format: 'esm',
                exports: 'named',
            },
        ],
        plugins: [
            peerDepsExternal(),
            typescript(),
            resolve(),
            commonjs(),
            terser(),
            postcss({
                plugins: [autoprefixer()],
            }),
            image({ extensions: /\.(png|jpg|jpeg|gif|svg)$/, limit: 10000 }),
        ],
    },
    {
        input: 'src/index.ts',
        output: [{ file: packageJson.types, format: 'es' }],
        plugins: [dts()],
    },
]
