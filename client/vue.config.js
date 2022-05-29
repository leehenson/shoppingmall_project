const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

const path = require("path");
const target = "http://127.0.0.1:3000";

module.exports = {
  // client 8080에서 서버를 호출하기 위한 path에 api라는 주소가 들어가면 target으로 mapping을 시킴
  outputDir: path.resolve(__dirname, "../server/dist"),
  devServer: {
    port: 8080,
    proxy: {
      // Server를 request하는 path의 주소 api가 있을 때 target으로 proxy함
      "^/api": {
        target,
        changeOrigin: true,
      },
      "^/upload": {
        target,
        changeOrigin: true,
      },
      "^/download": {
        target,
        changeOrigin: true,
      },
    },
  },
};
