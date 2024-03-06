const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const flowBotOnOf = addKeyword(EVENTS.ACTION).addAction(async (_, { globalState, endFlow }) => {
	const botOnOf = globalState.get('botOnOf');

	if (botOnOf) {
		await globalState.update({ botOnOf: false });
		return endFlow('📵 El bot se ha desactivado con éxito');
	} else {
		await globalState.update({ botOnOf: true });
		return endFlow('✅ El bot se ha activado con éxito');
	}
});

module.exports = { flowBotOnOf };
