import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const PRODUCTION = (process.env.NODE_ENV === 'PRODUCTION');
const DEBUG = !PRODUCTION;

export default {
	input: `src/${process.env.INPUT}.js`,
	output: {
		file: `dist/${process.env.INPUT}.bundle.js`,
		format: 'iife',
		sourcemap: DEBUG ? 'inline' : false
	},
	plugins: [
		resolve(),
		commonjs(),
		PRODUCTION ? terser() : null
	]
};