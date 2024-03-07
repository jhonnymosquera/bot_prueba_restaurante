const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const flowBotOnOf = addKeyword(EVENTS.ACTION).addAction(async (_, { globalState, flowDynamic, gotoFlow }) => {
	const botOnOf = globalState.get('botOnOf');

	if (botOnOf) {
		await globalState.update({ botOnOf: false });
		await flowDynamic('📵 El bot se ha desactivado con éxito');
	} else {
		await globalState.update({ botOnOf: true });
		await flowDynamic('✅ El bot se ha activado con éxito');
	}

	return gotoFlow(require('./01_admin.flow').flowsAdmin[0]);
});

module.exports = { flowBotOnOf };
