const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const { mensajes } = require('./mensajes');
const capture = true;

// Flujo 1
const comidas = ['🍕 Pizza', '🍣 Sushi', '🍔 Hamburguesas'];

const flowEnteroGotoFlow = addKeyword(EVENTS.WELCOME)
	.addAction(async (_, { globalState, endFlow }) => {
		const botOnOf = globalState.get('botOnOf');

		if (!botOnOf) return endFlow();
	})
	.addAnswer(
		mensajes.bienvenida,
		{ capture },

		async ({ body }, { state, gotoFlow, fallBack }) => {
			state.clear();
			const opcion = Number(body);
			const comida = comidas[opcion - 1];
			await state.update({ comida });
			await state.update({ inFlow: true });

			if (!comida) {
				return fallBack();
			} else {
				if (opcion == 1) return gotoFlow(flowPizza);
				if (opcion == 2) return gotoFlow(flowSushi);
				if (opcion == 3) return gotoFlow(flowHamburguesa);
			}
		}
	);

// Flujo 2
const ingredientes = {
	pizza: ['🍅 Tomate', '🥓 Pepperoni', '🍆 Vegetariana'],
	sushi: ['🥢 California Roll', '🍣 Sashimi Variado', '🦐 Tempura Roll'],
	hamburguesas: ['🍔 Clásica', '🥑 Vegetariana', '🧀 Doble Queso'],
};

const responseIngredientes = async ({ body }, { flowDynamic, state, gotoFlow, fallBack }) => {
	const opcion = parseInt(body);
	const comida = state.get('comida');
	const tipoIngredienteComida = ingredientes[comida.split(' ')[1].toLowerCase()];
	const tipoComida = tipoIngredienteComida[opcion - 1];

	if (!tipoComida) {
		return fallBack();
	} else {
		await state.update({ tipoComida });
		await flowDynamic(`
		${comida}
		${tipoComida}
		`);
		return gotoFlow(flowConfirmarPedido);
	}
};

const flowPizza = addKeyword(EVENTS.ACTION).addAnswer(mensajes.pizza, { capture }, responseIngredientes);
const flowSushi = addKeyword(EVENTS.ACTION).addAnswer(mensajes.sushi, { capture }, responseIngredientes);
const flowHamburguesa = addKeyword(EVENTS.ACTION).addAnswer(mensajes.hamburguesas, { capture }, responseIngredientes);

// Flujo 3
const flowConfirmarPedido = addKeyword(EVENTS.ACTION).addAnswer(
	mensajes.confirmar,
	{ capture },

	async ({ body }, { gotoFlow, fallBack, endFlow }) => {
		const opcion = Number(body);

		switch (opcion) {
			case 1:
				return gotoFlow(flowFormulario);

			case 2:
				return endFlow('¡Una lastima! Puedes volver a ver nuestros productos escribiendo "Menu"');

			default:
				return fallBack();
		}
	}
);

// Flujo 4
const flowFormulario = addKeyword(EVENTS.ACTION).addAnswer(
	'¿En qué dirección te gustaría recibir tu pedido?',
	{ capture },

	async ({ body }, { state, gotoFlow }) => {
		await state.update({ direccion: body });

		return gotoFlow(flowConfirmarNumero);
	}
);

// Flujo 5
const flowConfirmarNumero = addKeyword(EVENTS.ACTION).addAnswer(
	[`¿Podemos llamarte a este mismo numero?\n`, '1 - Si', '2 - Otro'],
	{ capture },

	async ({ body }, { gotoFlow, fallBack }) => {
		const opcion = Number(body);
		switch (opcion) {
			case 1:
				return gotoFlow(flowMismoNumero);

			case 2:
				return gotoFlow(otro_numero);

			default:
				return fallBack();
		}
	}
);

// Flujo Final - Numero de telefono
const numero_telefono = async ({ body, from }, { state, flowDynamic, endFlow, fallBack, provider, globalState }) => {
	await state.update({ inFlow: false });

	if (body == '1') {
		await state.update({ telefono: from.slice(2) });
	} else {
		if (body.length != 10 || Number(body).toString() == 'NaN') {
			await flowDynamic('El numero ingresado no es valido');
			return fallBack();
		}

		await state.update({ telefono: body });
		await flowDynamic('Resumen:');
	}
	const { comida, tipoComida, telefono, direccion } = state.getMyState();
	const numeroEmpleado = globalState.get('numeroEmpleado');

	const message = `pedido: ${comida} ${tipoComida}\ntelefono: ${telefono}\ndireccion: ${direccion}`;
	state.clear();

	provider.sendMessage(`57${numeroEmpleado}`, message, {});

	await flowDynamic(message);

	return endFlow('Gracias por usar nuestro servicio de pedidos a domicilio. ¡Tu comida estará en camino pronto! 🚀🍽️');
};

const flowMismoNumero = addKeyword(EVENTS.ACTION).addAnswer('Resumen:', null, numero_telefono);
const otro_numero = addKeyword(EVENTS.ACTION).addAnswer('Ingresa un numero de telefono', { capture }, numero_telefono);

const flowDomicilios = [
	flowEnteroGotoFlow,
	flowSushi,
	flowPizza,
	flowHamburguesa,
	flowConfirmarPedido,
	flowFormulario,
	flowConfirmarNumero,
	otro_numero,
	flowMismoNumero,
];

module.exports = flowDomicilios;
