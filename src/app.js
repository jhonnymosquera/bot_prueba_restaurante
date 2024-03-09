require('dotenv').config();
require('./config/express').app;

const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');

const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const flowDomicilios = require('./flows/menu_gotoFlow/flowDomicilios');
const { flowsAdmin } = require('./flows/admin/01_admin.flow');
const { database } = require('./config/database');

const main = async () => {
	createBot({
		flow: createFlow([...flowsAdmin, ...flowDomicilios]),
		provider: createProvider(BaileysProvider),
		database,
	});
};

main();
