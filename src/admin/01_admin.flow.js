const { addKeyword } = require('@bot-whatsapp/bot');
const { flowBotOnOf } = require('./02_botOnOf.flow');
const { flowNumeroEmpleado } = require('./03_numeroEmpleado.flow');

const capture = true;

const flowAdmin = addKeyword('modo-admin').addAnswer(
	['⚙️ ¿Que quieres hacer? 🛠️\n', '1 - Activar o Desactivar bot', '2 - Cambiar Numero de Empleado'],
	{ capture },

	async ({ body }, { gotoFlow, flowDynamic, fallBack }) => {
		const option = Number(body);

		switch (option) {
			case 1:
				return gotoFlow(flowBotOnOf);

			case 2:
				return gotoFlow(flowNumeroEmpleado);

			default:
				await flowDynamic('❌ La opción seleccionada no existe');
				return fallBack();
		}
	}
);

const flowsAdmin = [flowAdmin, flowBotOnOf, flowNumeroEmpleado];

module.exports = { flowsAdmin };
