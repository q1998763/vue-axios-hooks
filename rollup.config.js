import vue from 'rollup-plugin-vue'

export default {
  input: './src/index.js',
  output: {
    format: 'esm',
    file: 'dist/vue-axios-hook.esm.js',
    sourcemap: false
  },
  plugins: [vue()]
}
