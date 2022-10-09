const db = require("../server/db")


class User {
    async create(name, email, password) {
        return (
            await db.query(
                `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;`, [name, email, password]
            )
        ).rows[0]

    }
    async getAll() {
        return (
            await db.query(
                `SELECT * FROM USERS`
            )
        ).rows
    }
}

module.exports = new User();