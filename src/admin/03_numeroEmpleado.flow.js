const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const flowNumeroEmpleado = addKeyword(EVENTS.ACTION).addAnswer(
	'Ingrese el nuevo numero',
	{ capture: true },

	async ({ body }, { globalState, flowDynamic, fallBack, gotoFlow }) => {
		const numeroEmpleado = body;

		if (body.length < 10 || body[0] != '3') {
			await flowDynamic('❌ El numero ingresado es incorrecto');
			return fallBack();
		}

		await globalState.update({ numeroEmpleado });
		await flowDynamic(`📲 El numero de empleado cambiado correctamente`);

		return gotoFlow(require('./01_admin.flow').flowsAdmin[0]);
	}
);

module.exports = { flowNumeroEmpleado };
