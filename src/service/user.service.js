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

    async getFriends(userId) {
        const statement = `
        SELECT u.id, u.name, u.avatar_url, u.sign
        FROM user u
        JOIN friends f ON u.id = f.friend_id
        WHERE f.user_id = ?;
    `;
        const [values] = await connection.execute(statement, [userId]);
        return values;
    }

    async addFriend(userId, friendName) {
        // 通过名字查找好友的ID
        const [friend] = await this.findUser(friendName);
        if (!friend) {
            throw new Error(`用户: ${friendName} 不存在!`);
        }
        const friendId = friend.id;

        // 在friends表中插入两行新的记录，实现双向好友
        const statement = `
        INSERT INTO friends (user_id, friend_id)
        VALUES (?, ?), (?, ?);
    `;
        const [result] = await connection.execute(statement, [userId, friendId, friendId, userId]);
        return result;
    }
}

module.exports = new UserService()