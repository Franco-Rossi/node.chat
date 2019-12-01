const store = require('./store');
const socket = require('../../socket').socket;

function addMessage(chat, user, message, file) {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error('[messageController] No hay chat, usuario o mensaje');
            return reject('Los datos son incorrectos');
        }

        let filePath = '';
        if (file) {
            filePath = 'http://localhost:3000/app/files/' + file.filename;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: filePath
        };

        store.add(fullMessage);

        socket.io.emit('message', fullMessage);

        resolve(fullMessage);
    });
}

function getMessages(filterChat) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterChat));
    });
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            return reject('Invalid data');
        }
        const result = await store.updateText(id, message);

        resolve(result);
    });
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject('ID invalido');
        }

        store
            .remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                return reject(e);
            });
    });
}
module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};
