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
exports.ApiMessageRepository = void 0;
/**
 * Імітація API для збереження повідомлень
 */
const mockApi = (filePath, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Тут можна імітувати затримку мережі
    return Promise.resolve();
});
/**
 * Клас, що реалізує збереження повідомлень через API
 */
class ApiMessageRepository {
    /**
     * Створює новий репозиторій
     * @param logger - логер для виведення інформації
     */
    constructor(logger) {
        this.logger = logger;
    }
    /**
     * Зберігає повідомлення через API
     */
    save(message, destination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Підготовка даних для відправки
                const data = JSON.stringify({
                    message: message.getMessage(),
                    timestamp: message.getTimestamp(),
                    type: message.getType()
                });
                // Відправка даних
                yield mockApi(destination, data);
                // Логування успішного збереження
                this.logger.info(`Saved message - ${message.getMessage()} to ${destination} as ${message.getType()}`);
            }
            catch (error) {
                // Логування помилки
                this.logger.error(`Error saving message to ${destination}`, error);
            }
        });
    }
}
exports.ApiMessageRepository = ApiMessageRepository;
