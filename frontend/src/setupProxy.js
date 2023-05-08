const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
    target: 'http://127.0.0.1:4500',
    secure: false,
    ws: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    },
  }),
  createProxyMiddleware('/ws', {
    target: 'http://127.0.0.1:4000',
    secure: false,
    ws: false,
    changeOrigin: true,
    pathRewrite: {
      "^/ws": ""
    },
  }))
}
