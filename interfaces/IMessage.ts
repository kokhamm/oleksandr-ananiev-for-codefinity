/**
 * Інтерфейс, що визначає структуру повідомлення
 */
export interface IMessage {
  /**
   * Отримати текст повідомлення
   */
  getMessage(): string;
  
  /**
   * Отримати часову мітку
   */
  getTimestamp(): string;
  
  /**
   * Отримати тип повідомлення
   */
  getType(): string;
  
  /**
   * Встановити тип повідомлення
   */
  setType(type: string): void;
} 