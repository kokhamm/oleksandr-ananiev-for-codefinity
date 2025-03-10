import { IMessage } from "../interfaces";

/**
 * Клас, що представляє повідомлення
 */
export class Message implements IMessage {
  private readonly message: string;
  private readonly timestamp: string;
  private type: string = "";

  /**
   * Створює новий екземпляр повідомлення
   */
  constructor(message: string, timestamp: string) {
    this.message = message.trim();
    this.timestamp = timestamp.trim();
  }

  /**
   * Отримує текст повідомлення
   */
  getMessage(): string {
    return this.message;
  }

  /**
   * Отримує часову мітку
   */
  getTimestamp(): string {
    return this.timestamp;
  }

  /**
   * Отримує тип повідомлення
   */
  getType(): string {
    return this.type;
  }

  /**
   * Встановлює тип повідомлення
   */
  setType(type: string): void {
    this.type = type;
  }

  /**
   * Створює екземпляр повідомлення з рядка
   */
  static fromLine(line: string): IMessage {
    const [message, timestamp] = line.split(":");
    return new Message(message, timestamp);
  }
} 