const KoaRouter = require('@koa/router')
const {askToChatGpt} = require("../controller/chatGpt.controller");

const chatRouter = new KoaRouter()

// AI聊天接口
chatRouter.post('/chat/bot', askToChatGpt);
// 其它用户聊天接口

module.exports = chatRouter