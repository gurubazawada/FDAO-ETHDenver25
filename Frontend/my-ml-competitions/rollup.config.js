// rollup.config.js
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js', // adjust as needed
  output: {
    file: 'dist/bundle.js',
    format: 'esm', // or any other format you need
  },
  plugins: [
    json(), // now Rollup can import JSON files
    // ...other plugins
  ]
};
