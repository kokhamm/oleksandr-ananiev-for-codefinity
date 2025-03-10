"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
/**
 * Клас, що реалізує логування в консоль
 */
class ConsoleLogger {
    /**
     * Логує інформаційне повідомлення
     */
    info(message) {
        console.log(message);
    }
    /**
     * Логує повідомлення про помилку
     */
    error(message, error) {
        console.error(message, error ? error : "");
    }
}
exports.ConsoleLogger = ConsoleLogger;
