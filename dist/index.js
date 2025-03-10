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
const models_1 = require("./models");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Створюємо додаток за допомогою фабрики
    const app = new models_1.AppFactory().create();
    // Запускаємо обробку
    yield app.run();
});
// Запускаємо головну функцію
main().catch(error => {
    console.error("Unhandled error:", error);
    process.exit(1);
});
