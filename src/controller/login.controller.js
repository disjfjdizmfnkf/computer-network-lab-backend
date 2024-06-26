const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require("../config/secret");


class LoginController {
    sign(ctx, next) {
        // 1.获取用户信息
        const {id, name, avatar_url, sign} = ctx.user

        // 2.颁发token
        const token = jwt.sign({id, name}, PRIVATE_KEY, {
            // 保存时间 (s)
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })

        // 3.返回用户信息
        ctx.body = {code: 0, data: {id, name, token, avatar_url, sign}}
    }

    test(ctx, next) {
        ctx.body = '身份验证通过'
    }
}

module.exports = new LoginController()