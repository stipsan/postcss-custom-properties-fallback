export default {
  input: 'src/plugin.js',
  external: ['postcss-values-parser'],
  output: [{ file: 'dist/plugin.js', format: 'cjs' }],
};
