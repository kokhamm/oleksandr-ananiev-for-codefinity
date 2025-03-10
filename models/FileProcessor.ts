import { IFileService, ILogger, IMessage, IMessageProcessor, IParser } from "../interfaces";

/**
 * Клас для обробки файлів та їх вмісту
 */
export class FileProcessor {
  private readonly fileService: IFileService;
  private readonly parser: IParser;
  private readonly processor: IMessageProcessor;
  private readonly logger: ILogger;

  /**
   * Створює новий обробник файлів
   * @param fileService - сервіс для роботи з файлами
   * @param parser - парсер для розбору рядків
   * @param processor - процесор для обробки повідомлень
   * @param logger - логер для виведення інформації
   */
  constructor(
    fileService: IFileService,
    parser: IParser,
    processor: IMessageProcessor,
    logger: ILogger
  ) {
    this.fileService = fileService;
    this.parser = parser;
    this.processor = processor;
    this.logger = logger;
  }

  /**
   * Обробляє вказаний файл
   * @param filePath - шлях до файлу
   */
  async processFile(filePath: string): Promise<void> {
    try {
      // Отримуємо вміст файлу
      const content = await this.fileService.readFile(filePath);
      
      // Якщо файл порожній, завершуємо обробку
      if (!content) {
        return;
      }

      // Розбиваємо на рядки
      const lines = content.split("\n");
      
      // Створюємо масив обіцянок для обробки кожного рядка
      const tasks = lines.map(line => this.processLine(line));
      
      // Чекаємо завершення всіх завдань
      await Promise.all(tasks);
    } catch (error) {
      // Логуємо помилку
      this.logger.error(`Error processing file: ${filePath}`, error as Error);
    }
  }

  /**
   * Обробляє один рядок з файлу
   * @param line - рядок для обробки
   */
  private async processLine(line: string): Promise<void> {
    try {
      // Парсимо рядок у повідомлення
      const message = this.parser.parse(line);
      
      // Перевіряємо, чи парсинг був успішним
      if (!message.getMessage() && !message.getTimestamp()) {
        return;
      }
      
      // Обробляємо повідомлення
      await this.processor.process(message);
    } catch (error) {
      // Логуємо помилку
      this.logger.error(`Error processing line: ${line}`, error as Error);
    }
  }
} 