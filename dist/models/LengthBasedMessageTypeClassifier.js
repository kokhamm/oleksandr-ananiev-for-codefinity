"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LengthBasedMessageTypeClassifier = void 0;
/**
 * Клас, що класифікує повідомлення за їх довжиною
 */
class LengthBasedMessageTypeClassifier {
    /**
     * Створює новий класифікатор
     * @param threshold - порогове значення довжини
     * @param longType - тип для довгих повідомлень
     * @param shortType - тип для коротких повідомлень
     */
    constructor(threshold = 8, longType = "long", shortType = "short") {
        this.threshold = threshold;
        this.longType = longType;
        this.shortType = shortType;
    }
    /**
     * Класифікує повідомлення і встановлює йому тип
     */
    classify(message) {
        const type = message.getMessage().length > this.threshold
            ? this.longType
            : this.shortType;
        message.setType(type);
    }
}
exports.LengthBasedMessageTypeClassifier = LengthBasedMessageTypeClassifier;
