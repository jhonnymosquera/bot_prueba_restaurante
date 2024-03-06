const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const capture = true;

const flowNumeroEmpleado = addKeyword(EVENTS.ACTION).addAnswer(
	'Ingrese el nuevo numero',
	{ capture },

	async ({ body }, { globalState, flowDynamic, fallBack, endFlow }) => {
		const numeroEmpleado = body;

		if (body.length < 10 || body[0] != '3') {
			await flowDynamic('❌ El numero ingresado es incorrecto');
			return fallBack();
		}

		await globalState.update({ numeroEmpleado });
		await endFlow(`📲 El numero de empleado cambiado correctamente`);
	}
);

module.exports = { flowNumeroEmpleado };
