const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/auth", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/image", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/request", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/trade", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/chat", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
