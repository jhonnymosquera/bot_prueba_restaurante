const { addKeyword } = require('@bot-whatsapp/bot');
const { mensajes } = require('../menu/mensajes');
const capture = true;
const comidas = ['🍕 Pizza', '🍣 Sushi', '🍔 Hamburguesas'];
const ingredientes = {
	pizza: ['🍅 Margherita', '🥓 Pepperoni', '🍆 Vegetariana'],
	sushi: ['🥢 California Roll', '🍣 Sashimi Variado', '🦐 Tempura Roll'],
	hamburguesas: ['🍔 Clásica', '🥑 Vegetariana', '🧀 Doble Queso'],
};

// Final
const mensaje_final = addKeyword('1').addAnswer('Gracias por usar nuestro servicio de pedidos a domicilio. ¡Tu comida estará en camino pronto! 🚀🍽️');

const flowCancelar = addKeyword('2').addAnswer('¡Una lastima! Puedes volver a ver nuestros productos escribiendo "Menu"');

// Flujo 6
const mismo_numero = addKeyword('1').addAnswer(
	'Resumen:',
	null,

	async ({ from }, { state, gotoFlow, flowDynamic }) => {
		await state.update({ telefono: from.slice(2) });

		const comida = state.get('comida');
		const tipoComida = state.get('tipoComida');
		const telefono = state.get('telefono');
		const direccion = state.get('direccion');

		await flowDynamic([`pedido: ${comida} ${tipoComida}`, `telefono: ${telefono}`, `direccion: ${direccion}`]);

		return gotoFlow(mensaje_final);
	}
);

// Flujo 6
const otro_numero = addKeyword('2').addAnswer(
	'Ingresa un numero de telefono',
	{ capture },

	async ({ body }, { state, gotoFlow, flowDynamic }) => {
		await state.update({ telefono: body });

		const comida = state.get('comida');

		const tipoComida = state.get('tipoComida');
		const telefono = state.get('telefono');
		const direccion = state.get('direccion');

		await flowDynamic([`pedido: ${comida} ${tipoComida}`, `telefono: ${telefono}`, `direccion: ${direccion}`]);

		return gotoFlow(mensaje_final);
	}
);

// Flujo 5
const numero = addKeyword('.').addAnswer(
	[`¿Podemos llamarte a este mismo numero?\n`, '1 - Si', '2 - Otro'],
	{ capture },

	null,
	[mismo_numero, otro_numero]
);

// Flujo 4
const flowFormulario = addKeyword('1').addAnswer(
	'¿En qué dirección te gustaría recibir tu pedido?',
	{ capture },

	async ({ body, from }, { state }) => {
		await state.update({ direccion: body });
	},
	[numero]
);

// Flujo 3
const flowConfirmarPedido = addKeyword(['1', '2', '3']).addAnswer(
	mensajes.confirmar,
	{ capture },

	null,
	[flowFormulario, flowCancelar]
);

// Flujo 2
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

const flowPizza = addKeyword(['1', 'pizza']).addAnswer(mensajes.pizza, { capture }, ingrediente, [flowConfirmarPedido]);
const flowSushi = addKeyword(['2', 'sushi']).addAnswer(mensajes.sushi, { capture }, ingrediente, [flowConfirmarPedido]);
const flowHamburguesas = addKeyword(['3', 'hamburguesas']).addAnswer(mensajes.hamburguesas, { capture }, ingrediente, [flowConfirmarPedido]);

// Flujo 1
const flowEntero = addKeyword(['Hola', 'Domicilio', 'Menu']).addAnswer(
	mensajes.bienvenida,
	{ capture },

	async ({ body }, { state, fallBack }) => {
		const opcion = Number(body);
		if (opcion < 1 || opcion > 3 || opcion == NaN) return fallBack();
		const comida = comidas[opcion - 1];

		await state.update({ comida });
	},
	[flowPizza, flowSushi, flowHamburguesas]
);

module.exports = flowEntero;
