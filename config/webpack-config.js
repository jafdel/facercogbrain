module.exports = function (webpackEnv) {
    // ...
    return {
     // ...
     devServer: {
      hustoryApiFallback: true
     },
     resolve: {
        // ...
        fallback: {
          // 👇️👇️👇️ add this 👇️👇️👇️
          path: require.resolve("path-browserify"),
          stream: require.resolve("stream-browserify"),
          zlib: require.resolve('browserify-zlib'),
          fs: false,
          dgram: false,
          "os": false,
          "tls": false,
          "dns": false,
          "net": false,
          "http2": false
        }
      }
    }
  }