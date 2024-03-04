const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const PostgreSQLAdapter = require('@bot-whatsapp/database/postgres');
const { JsonFileDB } = require('@bot-whatsapp/database/json');
const flowDomicilios = require('./menu_gotoFlow/flowDomicilios');

const test = addKeyword(test).addAnswer('Probando json');

const main = async () => {
	const database = new PostgreSQLAdapter({
		host: 'viaduct.proxy.rlwy.net',
		user: 'postgres',
		database: 'bot_restaurante',
		password: 'caBf*CDa64efeAd2163Ga4f65CAd3C3a',
		port: 54636,
	});

	createBot({
		flow: createFlow([...flowDomicilios]),
		provider: createProvider(BaileysProvider),
		database,
	});

	QRPortalWeb();
};

main();
