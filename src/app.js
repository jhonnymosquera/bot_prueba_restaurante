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
	createBot({
		flow: createFlow([...flowDomicilios]),
		provider: createProvider(BaileysProvider),
		database: new MockAdapter(),
	});

	QRPortalWeb();
};

main();
