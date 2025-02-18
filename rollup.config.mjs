import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import  terser  from "@rollup/plugin-terser";
import { builtinModules } from 'module';

export default {
  input: 'src/index.ts', 
  output: [
    {
      dir: 'dist',  
      format: 'esm', 
      preserveModules: true,  
      preserveModulesRoot: 'src',  
      entryFileNames: '[name].mjs',
    },
    {
        dir: 'dist',
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].cjs',
      }
  ],
  external: [
    ...builtinModules,
    /node_modules/
  ],
  plugins: [
    resolve({preferBuiltins: true, browser: false}), 
    typescript({ tsconfig: './tsconfig.json' }),
    terser()
  ],
};