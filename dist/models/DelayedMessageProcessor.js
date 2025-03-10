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
exports.DelayedMessageProcessor = void 0;
/**
 * Клас, що обробляє повідомлення з випадковою затримкою
 */
class DelayedMessageProcessor {
    /**
     * Створює новий процесор повідомлень
     * @param repository - репозиторій для збереження повідомлень
     * @param classifier - класифікатор для визначення типу повідомлення
     * @param logger - логер для виведення інформації
     * @param destination - місце призначення для збереження
     * @param maxDelay - максимальна затримка в секундах
     */
    constructor(repository, classifier, logger, destination, maxDelay = 5) {
        this.repository = repository;
        this.classifier = classifier;
        this.logger = logger;
        this.destination = destination;
        this.maxDelay = maxDelay;
    }
    /**
     * Обробляє повідомлення з випадковою затримкою
     */
    process(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Класифікуємо повідомлення
                this.classifier.classify(message);
                // Очікуємо випадковий час
                yield this.delay();
                // Зберігаємо повідомлення
                yield this.repository.save(message, this.destination);
            }
            catch (error) {
                // Логуємо помилку
                this.logger.error(`Error processing message: ${message.getMessage()}`, error);
            }
        });
    }
    /**
     * Створює затримку на випадковий час
     */
    delay() {
        const delayMs = Math.random() * this.maxDelay * 1000;
        return new Promise(resolve => setTimeout(resolve, delayMs));
    }
}
exports.DelayedMessageProcessor = DelayedMessageProcessor;
