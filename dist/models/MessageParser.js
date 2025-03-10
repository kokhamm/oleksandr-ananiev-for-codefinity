"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageParser = void 0;
const Message_1 = require("./Message");
/**
 * Клас, що парсить рядки у повідомлення
 */
class MessageParser {
    /**
     * Парсить рядок і повертає об'єкт повідомлення
     */
    parse(line) {
        try {
            const [message, timestamp] = line.split(":");
            return new Message_1.Message(message, timestamp);
        }
        catch (error) {
            // У випадку помилки повертаємо пусте повідомлення
            return new Message_1.Message("", "");
        }
    }
}
exports.MessageParser = MessageParser;
