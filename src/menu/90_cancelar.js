const { addKeyword } = require('@bot-whatsapp/bot');

const flowCancelar = addKeyword('2').addAnswer('¡Una lastima! Puedes volver a ver nuestros productos escribiendo "Menu"');

module.exports = flowCancelar;
