import {msgModel} from "./models/messages.model.js"

class ChatManager{

    getAll = async () => {
        try {
            const messages = await msgModel.find();
            return messages;
        } catch (error) {
            console.log(error);
        }
    }

    addMessageToDB = async (message) => {
        try {
            await msgModel.create(message);
        } catch (error) {
            console.log(error);
        }
    }

    deleteAllMessages = async () => {
        try {
            await msgModel.deleteMany();
        } catch (error) {
            console.log(error);
        }
    }
}

export default ChatManager;