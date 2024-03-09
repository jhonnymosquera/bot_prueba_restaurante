const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
	console.log(`API corriendo en el puerto ${PORT}`);
});
app.get('/', async (req, res) => {
	res.sendFile(path.join(process.cwd(), 'bot.qr.png'));
});

module.exports = { app };
