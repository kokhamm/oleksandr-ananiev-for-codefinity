/**
 * Інтерфейс, що визначає логер
 */
export interface ILogger {
  /**
   * Логує інформаційне повідомлення
   */
  info(message: string): void;
  
  /**
   * Логує повідомлення про помилку
   */
  error(message: string, error?: Error): void;
} 