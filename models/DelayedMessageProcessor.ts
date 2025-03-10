import { ILogger, IMessage, IMessageProcessor, IMessageRepository, IMessageTypeClassifier } from "../interfaces";

/**
 * Клас, що обробляє повідомлення з випадковою затримкою
 */
export class DelayedMessageProcessor implements IMessageProcessor {
  private readonly repository: IMessageRepository;
  private readonly classifier: IMessageTypeClassifier;
  private readonly logger: ILogger;
  private readonly destination: string;
  private readonly maxDelay: number;

  /**
   * Створює новий процесор повідомлень
   * @param repository - репозиторій для збереження повідомлень
   * @param classifier - класифікатор для визначення типу повідомлення
   * @param logger - логер для виведення інформації
   * @param destination - місце призначення для збереження
   * @param maxDelay - максимальна затримка в секундах
   */
  constructor(
    repository: IMessageRepository,
    classifier: IMessageTypeClassifier,
    logger: ILogger,
    destination: string,
    maxDelay: number = 5
  ) {
    this.repository = repository;
    this.classifier = classifier;
    this.logger = logger;
    this.destination = destination;
    this.maxDelay = maxDelay;
  }

  /**
   * Обробляє повідомлення з випадковою затримкою
   */
  async process(message: IMessage): Promise<void> {
    try {
      // Класифікуємо повідомлення
      this.classifier.classify(message);
      
      // Очікуємо випадковий час
      await this.delay();
      
      // Зберігаємо повідомлення
      await this.repository.save(message, this.destination);
    } catch (error) {
      // Логуємо помилку
      this.logger.error(`Error processing message: ${message.getMessage()}`, error as Error);
    }
  }

  /**
   * Створює затримку на випадковий час
   */
  private delay(): Promise<void> {
    const delayMs = Math.random() * this.maxDelay * 1000;
    return new Promise(resolve => setTimeout(resolve, delayMs));
  }
} 