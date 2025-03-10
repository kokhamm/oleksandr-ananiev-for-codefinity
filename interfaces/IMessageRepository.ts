import { IMessage } from "./IMessage";

/**
 * Інтерфейс, що визначає сховище повідомлень
 */
export interface IMessageRepository {
  /**
   * Зберігає повідомлення
   */
  save(message: IMessage, destination: string): Promise<void>;
} 