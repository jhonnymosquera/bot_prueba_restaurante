const { addKeyword } = require('@bot-whatsapp/bot');
const { mensajes } = require('./mensajes');
const { flowPizza, flowSushi, flowHamburguesas } = require('./10_ingredientes');

const comidas = ['🍕 Pizza', '🍣 Sushi', '🍔 Hamburguesas'];

const bienvenida = addKeyword(['Hola', 'Domicilio', 'Menu']).addAnswer(
	mensajes.bienvenida,
	{ capture: true },

	async ({ body }, { state }) => {
		const opcion = parseInt(body);
		const comida = comidas[opcion - 1];

		await state.update({ comida });
	},
	[flowPizza, flowSushi, flowHamburguesas]
);

module.exports = { bienvenida };
