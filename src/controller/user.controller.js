const UserService = require('../service/user.service')
const FileService = require("../service/file.service");
const fs = require("fs");
const {UPLOAD_PATH} = require("../config/path");

class UserController {
    // 创建用户到数据库
    async creat(ctx, next) {
        // 获取用户信息
        const user = ctx.request.body

        // 将数据存入数据库
        const result = await UserService.create(user)

        ctx.body = {
            message: '创建用户成功!',
            data: result
        }
    }

    // 展示用户头像
    async showAvatarImage(ctx, next) {
        // 1.获取用户id
        const { userId } = ctx.params

        // 2.从数据库中查询
        const avatarInfo = await FileService.queryAvatarWithUserId(userId)

        // 3.读取头像所在的文件
        const { filename, mimetype } = avatarInfo
        ctx.type = mimetype
        ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
    }

    async queryUserByName(ctx, next) {
        const { userName } = ctx.params
        console.log(userName)
        const result = await UserService.findUser(userName)
        ctx.body = {
            code: 0,
            data: result
        }
    }

    async updateUser(ctx, next) {
        const { id } = ctx.params;
        const { name, sign } = ctx.request.body;
        const result = await UserService.updateUser(id, name, sign);
        ctx.body = {
            code: 0,
            message: '用户信息更新成功',
            data: result
        }
    }

    async getFriends(ctx, next) {
        const { userId } = ctx.params;
        const result = await UserService.getFriends(userId);
        ctx.body = {
            code: 0,
            data: result
        }
    }

    async addFriend(ctx, next) {
        const { userId } = ctx.params;
        const { friendName } = ctx.request.body;
        const result = await UserService.addFriend(userId, friendName);
        ctx.body = {
            code: 0,
            message: '添加好友成功',
            data: result
        }
    }
}

module.exports = new UserController()
