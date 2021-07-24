import Message from '../../models/Message.js';

// save message in the database
const saveMessage = async (request, response) => {
    const newMessage = new Message({
        conversationId: request.body.conversationId,
          senderId: request.body.senderId,
          text: request.body.text,
    });

    try {
        // save new message in the database
        const savedMessage = await newMessage.save();
        response.status(200).json(savedMessage);
    } catch (error) {
        response.status(500).json(error);
    }
}


// get all messages of two specific users from the database
const getMessages = async (request, response) => {
    try {
        const messageList = await Message.find({ conversationId: request.params.conversationId });
        response.status(200).json(messageList);
    } catch (error) {
        response.status(500).json(error);
    }
}

// delete a specific message from the database
const deleteMessage = async (request, response) => {
    const messageId = request.query.messageId;
    try {
        const res = await Message.deleteOne({_id: messageId});
        response.status(200).json(res);
    } catch (error) {
        response.status(500).json(error);
    }
}

export { saveMessage, getMessages, deleteMessage };
