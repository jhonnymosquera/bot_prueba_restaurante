require('dotenv').config();
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const PostgreSQLAdapter = require('@bot-whatsapp/database/postgres');
const flowDomicilios = require('./menu_gotoFlow/flowDomicilios');
const { flowsAdmin } = require('./admin/01_admin.flow');

const main = async () => {
	const database = new PostgreSQLAdapter({
		host: process.env.POSTGRES_HOST,
		user: process.env.POSTGRES_USER,
		database: process.env.POSTGRES_DATABASE,
		password: process.env.POSTGRES_PASSWORD,
		port: process.env.POSTGRES_PORT,
	});

	createBot({
		flow: createFlow([...flowsAdmin, ...flowDomicilios]),
		provider: createProvider(BaileysProvider),
		database,
	});

	QRPortalWeb();
};

main();
