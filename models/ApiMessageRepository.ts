import { ILogger, IMessage, IMessageRepository } from "../interfaces";

/**
 * Імітація API для збереження повідомлень
 */
const mockApi = async (
  filePath: string,
  data: string
): Promise<void> => {
  // Тут можна імітувати затримку мережі
  return Promise.resolve();
};

/**
 * Клас, що реалізує збереження повідомлень через API
 */
export class ApiMessageRepository implements IMessageRepository {
  private readonly logger: ILogger;

  /**
   * Створює новий репозиторій
   * @param logger - логер для виведення інформації
   */
  constructor(logger: ILogger) {
    this.logger = logger;
  }

  /**
   * Зберігає повідомлення через API
   */
  async save(message: IMessage, destination: string): Promise<void> {
    try {
      // Підготовка даних для відправки
      const data = JSON.stringify({
        message: message.getMessage(),
        timestamp: message.getTimestamp(),
        type: message.getType()
      });

      // Відправка даних
      await mockApi(destination, data);
      
      // Логування успішного збереження
      this.logger.info(
        `Saved message - ${message.getMessage()} to ${destination} as ${message.getType()}`
      );
    } catch (error) {
      // Логування помилки
      this.logger.error(`Error saving message to ${destination}`, error as Error);
    }
  }
} 