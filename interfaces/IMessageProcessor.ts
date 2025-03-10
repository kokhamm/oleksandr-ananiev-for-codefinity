import { IMessage } from "./IMessage";

/**
 * Інтерфейс, що визначає процесор повідомлень
 */
export interface IMessageProcessor {
  /**
   * Обробляє повідомлення
   */
  process(message: IMessage): Promise<void>;
} 