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
exports.MockFileService = void 0;
/**
 * Мок сховище файлів
 */
const mockFiles = {
    "file1.txt": `Hello world! : 2024-02-22 14:35:30 UTC
Goodbye world! : 2024-02-22 16:35:30 UTC
Hello? : 2024-02-22 08:35:30 UTC
Hi : 2024-02-22 12:35:30 UTC`,
    "file2.txt": `How are you doing ? : 2024-02-22 13:59:30 UTC
Fine : 2024-02-22 12:44:30 UTC
How about you ? : 2024-02-22 22:35:30 UTC
Same : 2024-02-22 07:39:30 UTC`,
    "file3.txt": `Have you seen high elves ? : 2022-02-22 14:35:30 UTC
HESOYAM : 2023-02-22 14:35:30 UTC
BAGUVIX : 2021-02-22 14:35:30 UTC
THERE IS NO SPOON : 2020-02-22 14:35:30 UTC`,
};
/**
 * Клас, що імітує роботу з файлами
 */
class MockFileService {
    /**
     * Зчитує вміст "файлу" з мок сховища
     */
    readFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = mockFiles[filePath]) !== null && _a !== void 0 ? _a : "";
        });
    }
    /**
     * Імітує запис у файл (нічого не робить)
     */
    writeFile(filePath, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Тут можна зберігати дані в mockFiles, якщо потрібно
            return Promise.resolve();
        });
    }
}
exports.MockFileService = MockFileService;
