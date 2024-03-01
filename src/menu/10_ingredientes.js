const { addKeyword } = require('@bot-whatsapp/bot');
const { mensajes } = require('./mensajes');
const { flowConfirmarPedido } = require('./20_confirmar');

const ingredientes = {
	pizza: ['🍅 Margherita', '🥓 Pepperoni', '🍆 Vegetariana'],
	sushi: ['🥢 California Roll', '🍣 Sashimi Variado', '🦐 Tempura Roll'],
	hamburguesas: ['🍔 Clásica', '🥑 Vegetariana', '🧀 Doble Queso'],
};

const ingrediente = async ({ body }, { flowDynamic, state }) => {
	const opcion = parseInt(body) - 1;
	const comida = state.get('comida');
	const tipoComida = ingredientes[comida.split(' ')[1].toLowerCase()][opcion];
	await state.update({ tipoComida });

	return await flowDynamic(`
	${comida}
	${tipoComida}
	`);
};

const flowPizza = addKeyword(['1', 'pizza']).addAnswer(mensajes.pizza, { capture: true }, ingrediente, [flowConfirmarPedido]);
const flowSushi = addKeyword(['2', 'sushi']).addAnswer(mensajes.sushi, { capture: true }, ingrediente, [flowConfirmarPedido]);
const flowHamburguesas = addKeyword(['3', 'hamburguesas']).addAnswer(mensajes.hamburguesas, { capture: true }, ingrediente, [flowConfirmarPedido]);

module.exports = { flowPizza, flowSushi, flowHamburguesas };
