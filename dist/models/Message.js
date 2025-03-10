"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
/**
 * Клас, що представляє повідомлення
 */
class Message {
    /**
     * Створює новий екземпляр повідомлення
     */
    constructor(message, timestamp) {
        this.type = "";
        this.message = message.trim();
        this.timestamp = timestamp.trim();
    }
    /**
     * Отримує текст повідомлення
     */
    getMessage() {
        return this.message;
    }
    /**
     * Отримує часову мітку
     */
    getTimestamp() {
        return this.timestamp;
    }
    /**
     * Отримує тип повідомлення
     */
    getType() {
        return this.type;
    }
    /**
     * Встановлює тип повідомлення
     */
    setType(type) {
        this.type = type;
    }
    /**
     * Створює екземпляр повідомлення з рядка
     */
    static fromLine(line) {
        const [message, timestamp] = line.split(":");
        return new Message(message, timestamp);
    }
}
exports.Message = Message;
