const path = require('path');

const fs = require('fs');
const entryMap = {};

fs.readdirSync('./src/')
  .filter(file => {
      return file.match(/.*\.ts$/);
  })
  .forEach(f => {
    entryMap[f.replace(/\.ts$/, '')] = ['./src/' + f];
  });
  
module.exports = {
  mode: "production",
  entry: entryMap,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "commonjs",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'babel-loader',
      },
    ],
  },
};