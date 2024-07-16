// Here check the connection in db and insert the db user details
const db = require('../config/db');

const User = {
    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    create: async (name, email, password) => {
        const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        return { id: result.insertId, name, email };
    },
    update: async (id, name, email) => {
        await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        return { id, name, email };
    },
    delete: async (id) => {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
    }
};

module.exports = User;

module.exports = User;