var config = {
   entry: './app.js',
   
   output: {
      path:'/',
      filename: 'index.min.js',
   },
   
   devServer: {
      inline: true,
      port: 7777
   },
   
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['react', 'es2015', 'stage-0'],
               plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
            }
         }
      ]
   }
}

module.exports = config;