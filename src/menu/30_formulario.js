const { addKeyword } = require('@bot-whatsapp/bot');
const mensaje_final = require('./100_final');

capture = true;

const mismo_numero = addKeyword('1').addAnswer('¡Perfecto!', { capture }, async ({ from }, { state, gotoFlow }) => {
	await state.update({ telefono: from.slice(2) });

	return gotoFlow(mensaje_final);
});

const otro_numero = addKeyword('2').addAnswer('Ingresa un numero de telefono', { capture }, async ({ body }, { state, gotoFlow }) => {
	await state.update({ telefono: body });

	return gotoFlow(mensaje_final);
});

const flowFormulario = addKeyword('1')
	.addAnswer(
		'¿En qué dirección te gustaría recibir tu comida?',
		{ capture },

		async ({ body }, { state }) => {
			await state.update({ direccion: body });
		}
	)
	.addAnswer(
		[`¿Podemos llamarte a este mismo numero?\n`, '1. Si', '2. Otro'],
		{ capture },

		null,
		[mismo_numero, otro_numero]
	);

module.exports = flowFormulario;
