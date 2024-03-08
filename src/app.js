require('dotenv').config();
const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.get('/', async (req, res) => {
	res.sendFile(path.join(process.cwd(), 'bot.qr.png'));
});

const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const flowDomicilios = require('./flows/menu_gotoFlow/flowDomicilios');
const { flowsAdmin } = require('./flows/admin/01_admin.flow');
const { database } = require('./config/database');

const main = async () => {
	createBot({
		flow: createFlow([...flowsAdmin, ...flowDomicilios]),
		provider: createProvider(BaileysProvider),
		database,
	});
};

main();
