"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProcessor = void 0;
/**
 * Клас для обробки файлів та їх вмісту
 */
class FileProcessor {
    /**
     * Створює новий обробник файлів
     * @param fileService - сервіс для роботи з файлами
     * @param parser - парсер для розбору рядків
     * @param processor - процесор для обробки повідомлень
     * @param logger - логер для виведення інформації
     */
    constructor(fileService, parser, processor, logger) {
        this.fileService = fileService;
        this.parser = parser;
        this.processor = processor;
        this.logger = logger;
    }
    /**
     * Обробляє вказаний файл
     * @param filePath - шлях до файлу
     */
    processFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Отримуємо вміст файлу
                const content = yield this.fileService.readFile(filePath);
                // Якщо файл порожній, завершуємо обробку
                if (!content) {
                    return;
                }
                // Розбиваємо на рядки
                const lines = content.split("\n");
                // Створюємо масив обіцянок для обробки кожного рядка
                const tasks = lines.map(line => this.processLine(line));
                // Чекаємо завершення всіх завдань
                yield Promise.all(tasks);
            }
            catch (error) {
                // Логуємо помилку
                this.logger.error(`Error processing file: ${filePath}`, error);
            }
        });
    }
    /**
     * Обробляє один рядок з файлу
     * @param line - рядок для обробки
     */
    processLine(line) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Парсимо рядок у повідомлення
                const message = this.parser.parse(line);
                // Перевіряємо, чи парсинг був успішним
                if (!message.getMessage() && !message.getTimestamp()) {
                    return;
                }
                // Обробляємо повідомлення
                yield this.processor.process(message);
            }
            catch (error) {
                // Логуємо помилку
                this.logger.error(`Error processing line: ${line}`, error);
            }
        });
    }
}
exports.FileProcessor = FileProcessor;
