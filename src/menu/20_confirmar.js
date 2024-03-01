const { addKeyword } = require('@bot-whatsapp/bot');
const { mensajes } = require('./mensajes');
const flowFormulario = require('./30_formulario');
const flowCancelar = require('./90_cancelar');

const flowConfirmarPedido = addKeyword(['1', '2', '3']).addAnswer(
	mensajes.confirmar,
	{ capture: true },

	null,
	[flowFormulario, flowCancelar]
);

module.exports = { flowConfirmarPedido };
