const KoaRouter = require('@koa/router');
const {creat, updateUser} = require("../controller/user.controller")
const {verifyUser, handlePassword} = require("../middleware/user.middleware");
const {showAvatarImage, queryUserByName} = require('../controller/user.controller')
const {verifyAuth} = require("../middleware/login.middleware");
const {verifyPermission} = require("../middleware/permission.middleware");


// 1.创建路由对象
const userRouter = new KoaRouter({prefix: '/users'})

// 2.定义路由中的映射
// 用户注册接口
userRouter.post('/', verifyUser, handlePassword, creat)
// 查看用户头像
userRouter.get('/avatar/:userId', showAvatarImage)
// 查询用户信息
userRouter.get('/:userName', queryUserByName)

// 修改信息
userRouter.patch('/:id', verifyAuth, updateUser);


// 3.导出路由
module.exports = userRouter