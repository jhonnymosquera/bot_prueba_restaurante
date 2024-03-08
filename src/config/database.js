const PostgreSQLAdapter = require('@bot-whatsapp/database/postgres');

const database = new PostgreSQLAdapter({
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	database: process.env.POSTGRES_DATABASE,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
});

module.exports = { database };
