const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const flowDomicilios = require('./menu_gotoFlow/flowDomicilios');

const probandoNegrita = addKeyword('negrita').addAnswer(
	['*Respuesta en negrita?*'],
	null,

	async (_, { provider }) => {
		provider.sendMessage('573008825320', '*Se confirma el uso de negrita en el bot, NO RESPONDER ESTE MENSAJE*', {});
	}
);

const main = async () => {
	const adapterDB = new MockAdapter();
	const adapterFlow = createFlow([...flowDomicilios]);
	const adapterProvider = createProvider(BaileysProvider);

	provider.initHttpServer(3002);
	provider.http.server.get('/', async (req, res) => {
		res.sendFile(path.join(process.cwd(), 'bot.qr.png'));
	});

	createBot({
		flow: adapterFlow,
		provider: adapterProvider,
		database: adapterDB,
	});

	// QRPortalWeb();
};

main();
