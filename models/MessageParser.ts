import { IMessage, IParser } from "../interfaces";
import { Message } from "./Message";

/**
 * Клас, що парсить рядки у повідомлення
 */
export class MessageParser implements IParser {
  /**
   * Парсить рядок і повертає об'єкт повідомлення
   */
  parse(line: string): IMessage {
    try {
      const [message, timestamp] = line.split(":");
      return new Message(message, timestamp);
    } catch (error) {
      // У випадку помилки повертаємо пусте повідомлення
      return new Message("", "");
    }
  }
} 