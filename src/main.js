// 导入app
const app = require('./app/index')
const {SERVER_PORT} = require("./config/server");
require('./utils/handle-error')

// 启动服务器
app.listen(SERVER_PORT, () => {
    console.log(`服务运行成功🚀🚀🚀 端口:${SERVER_PORT}`);
});

//
// // 导入WebSocket服务器
// const { wss } = require('./app/index');
//
// // 启动WebSocket服务器
// wss.listen(8081, () => {
//     console.log('WebSocket服务器运行成功🚀 端口:8081');
// });
