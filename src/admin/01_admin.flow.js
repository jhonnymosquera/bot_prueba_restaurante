const { addKeyword } = require('@bot-whatsapp/bot');
const { flowBotOnOf } = require('./02_botOnOf.flow');
const { flowNumeroEmpleado } = require('./03_numeroEmpleado.flow');

const capture = true;
const idle = 10000; // 10 segundos

const flowAdmin = addKeyword('modo-admin').addAnswer(
	['⚙️ ¿Que quieres hacer? 🛠️\n', '1 - 🤖 Activar o Desactivar bot', '2 - 📱 Cambiar Numero de Empleado ', '3 - ➡️ Salir '],
	{ capture, idle },

	async ({ body, idleFallBack }, { gotoFlow, flowDynamic, fallBack, endFlow }) => {
		const option = Number(body);

		if (idleFallBack) {
			await flowDynamic('🏃🚪 Sesión cerrada por inactividad');
			return endFlow();
		}

		switch (option) {
			case 1:
				return gotoFlow(flowBotOnOf);

			case 2:
				return gotoFlow(flowNumeroEmpleado);

			case 3:
				await flowDynamic('🏃🚪 Sesión cerrada');
				return endFlow();

			default:
				await flowDynamic('❌ La opción seleccionada no existe');
				return fallBack();
		}
	}
);

const flowsAdmin = [flowAdmin, flowBotOnOf, flowNumeroEmpleado];

module.exports = { flowsAdmin };
