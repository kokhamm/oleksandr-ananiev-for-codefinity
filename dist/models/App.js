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
exports.AppFactory = exports.App = void 0;
const ApiMessageRepository_1 = require("./ApiMessageRepository");
const ConsoleLogger_1 = require("./ConsoleLogger");
const DelayedMessageProcessor_1 = require("./DelayedMessageProcessor");
const FileProcessor_1 = require("./FileProcessor");
const LengthBasedMessageTypeClassifier_1 = require("./LengthBasedMessageTypeClassifier");
const MessageParser_1 = require("./MessageParser");
const MockFileService_1 = require("./MockFileService");
/**
 * Клас, що представляє додаток
 */
class App {
    /**
     * Створює новий додаток
     * @param fileProcessors - мапа обробників файлів
     * @param logger - логер для виведення інформації
     */
    constructor(fileProcessors, logger) {
        this.fileProcessors = fileProcessors;
        this.logger = logger;
    }
    /**
     * Запускає обробку файлів
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Створюємо масив обіцянок для паралельної обробки файлів
                const tasks = Array.from(this.fileProcessors.entries()).map(([filePath, processor]) => processor.processFile(filePath));
                // Чекаємо завершення всіх завдань
                yield Promise.all(tasks);
            }
            catch (error) {
                // Логуємо помилку
                this.logger.error("Error running application", error);
            }
        });
    }
}
exports.App = App;
/**
 * Фабрика для створення додатку
 */
class AppFactory {
    /**
     * Створює новий екземпляр додатку
     */
    create() {
        // Створюємо базові компоненти
        const logger = new ConsoleLogger_1.ConsoleLogger();
        const fileService = new MockFileService_1.MockFileService();
        const parser = new MessageParser_1.MessageParser();
        const classifier = new LengthBasedMessageTypeClassifier_1.LengthBasedMessageTypeClassifier();
        const repository = new ApiMessageRepository_1.ApiMessageRepository(logger);
        // Мапа вхідних файлів до вихідних
        const files = new Map([
            ["file1.txt", "out1.txt"],
            ["file2.txt", "out2.txt"],
            ["file3.txt", "out3.txt"],
        ]);
        // Створюємо обробники для кожного файлу
        const fileProcessors = new Map();
        for (const [input, output] of files.entries()) {
            // Створюємо процесор повідомлень для цього файлу
            const processor = new DelayedMessageProcessor_1.DelayedMessageProcessor(repository, classifier, logger, output);
            // Створюємо обробник файлу
            const fileProcessor = new FileProcessor_1.FileProcessor(fileService, parser, processor, logger);
            // Додаємо до мапи
            fileProcessors.set(input, fileProcessor);
        }
        // Створюємо додаток
        return new App(fileProcessors, logger);
    }
}
exports.AppFactory = AppFactory;
