import { ILogger } from "../interfaces";

/**
 * Клас, що реалізує логування в консоль
 */
export class ConsoleLogger implements ILogger {
  /**
   * Логує інформаційне повідомлення
   */
  info(message: string): void {
    console.log(message);
  }

  /**
   * Логує повідомлення про помилку
   */
  error(message: string, error?: Error): void {
    console.error(message, error ? error : "");
  }
} 