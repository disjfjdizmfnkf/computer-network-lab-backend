const connection = require('../app/database')

class UserService {
    async create(user) {
        // 1.获取user
        const {name, password} = user

        // 2.拼接statement
        const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?);'

        // 3.执行sql语句
        const [result] = await connection.execute(statement, [name, password]);
        return result
    }

    async findUser(name) {
        const statement = 'SELECT * FROM `user` WHERE name = ?;'
        const [values] = await connection.execute(statement, [name])
        return values
    }

    async findUserById(id) {
        const statement = 'SELECT * FROM `user` WHERE id = ?;'
        const [values] = await connection.execute(statement, [id])
        return values
    }

    async updateUser(id, name, sign) {
        const statement = 'UPDATE `user` SET name = ?, sign = ? WHERE id = ?;';
        const [result] = await connection.execute(statement, [name, sign, id]);
        return result;
    }
}

module.exports = new UserService()