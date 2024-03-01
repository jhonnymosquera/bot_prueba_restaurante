const { v4: uuidv4 } = require('uuid');

const mensajes = {
	randomString: uuidv4(),
	bienvenida: [
		'Bienvenido al Servicio de Pedidos a Domicilio! 🍔🛵\n',
		'Por favor, seleccione una opción: \n',
		'1 - 🍕 Pizza',
		'2 - 🍣 Sushi',
		'3 - 🍔 Hamburguesas',
	],
	pizza: ['¡Perfecto! ¿Qué tipo de pizza te gustaría ordenar?\n', '1 - 🍅 Margherita', '2 - 🥓 Pepperoni', '3 - 🍆 Vegetariana'],
	sushi: ['¡Genial! ¿Qué rollo de sushi te gustaría pedir?\n', '1 - 🥢 California Roll', '2 - 🍣 Sashimi Variado', '3 - 🦐 Tempura Roll'],
	hamburguesas: [
		'¡Excelente elección! ¿Qué tipo de hamburguesa te gustaría ordenar?\n',
		'1 - 🍔 Clásica',
		'2 - 🥑 Vegetariana',
		'3 - 🧀 Doble Queso',
	],
	confirmar: [
		'Para confirmar tu pedido, por favor, selecciona la opción "Confirmar Pedido" cuando estés listo.\n',
		'1 - ✅ Confirmar Pedido',
		'2 - ❌ Cancelar',
	],
};

module.exports = { mensajes };
