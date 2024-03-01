const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const flowDomicilios = require('./menu_gotoFlow/flowDomicilios');

const main = async () => {
	const adapterDB = new MockAdapter();
	const adapterFlow = createFlow([...flowDomicilios, flowArchivos]);
	const adapterProvider = createProvider(BaileysProvider);

	createBot({
		flow: adapterFlow,
		provider: adapterProvider,
		database: adapterDB,
	});

	QRPortalWeb();
};

main();
