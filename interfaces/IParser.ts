import { IMessage } from "./IMessage";

/**
 * Інтерфейс, що визначає парсер рядків у повідомлення
 */
export interface IParser {
  /**
   * Парсить рядок і повертає об'єкт повідомлення
   */
  parse(line: string): IMessage;
} 