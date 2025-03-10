import { IMessage } from "./IMessage";

/**
 * Інтерфейс, що визначає класифікатор типів повідомлень
 */
export interface IMessageTypeClassifier {
  /**
   * Класифікує повідомлення і встановлює йому тип
   */
  classify(message: IMessage): void;
} 