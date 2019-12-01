const Model = require('./model');

function addChat(chat) {
    const myChat = new Model(chat);
    return myChat.save();
}

function listChats(userId) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (userId) {
            filter = { user: userId };
        }
        Model.find(filter)
            .populate('user')
            .exec((error, populated) => {
                if (error) {
                    return reject(error);
                }

                resolve(populated);
            });
    });
}

module.exports = {
    add: addChat,
    list: listChats
};
