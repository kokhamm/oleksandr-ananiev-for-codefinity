import { IApp, IAppFactory, IFileService, ILogger, IMessageProcessor, IMessageRepository, IMessageTypeClassifier, IParser } from "../interfaces";
import { ApiMessageRepository } from "./ApiMessageRepository";
import { ConsoleLogger } from "./ConsoleLogger";
import { DelayedMessageProcessor } from "./DelayedMessageProcessor";
import { FileProcessor } from "./FileProcessor";
import { LengthBasedMessageTypeClassifier } from "./LengthBasedMessageTypeClassifier";
import { MessageParser } from "./MessageParser";
import { MockFileService } from "./MockFileService";

/**
 * Клас, що представляє додаток
 */
export class App implements IApp {
  private readonly fileProcessors: Map<string, FileProcessor>;
  private readonly logger: ILogger;

  /**
   * Створює новий додаток
   * @param fileProcessors - мапа обробників файлів
   * @param logger - логер для виведення інформації
   */
  constructor(fileProcessors: Map<string, FileProcessor>, logger: ILogger) {
    this.fileProcessors = fileProcessors;
    this.logger = logger;
  }

  /**
   * Запускає обробку файлів
   */
  async run(): Promise<void> {
    try {
      // Створюємо масив обіцянок для паралельної обробки файлів
      const tasks = Array.from(this.fileProcessors.entries()).map(
        ([filePath, processor]) => processor.processFile(filePath)
      );
      
      // Чекаємо завершення всіх завдань
      await Promise.all(tasks);
    } catch (error) {
      // Логуємо помилку
      this.logger.error("Error running application", error as Error);
    }
  }
}

/**
 * Фабрика для створення додатку
 */
export class AppFactory implements IAppFactory {
  /**
   * Створює новий екземпляр додатку
   */
  create(): IApp {
    // Створюємо базові компоненти
    const logger = new ConsoleLogger();
    const fileService = new MockFileService();
    const parser = new MessageParser();
    const classifier = new LengthBasedMessageTypeClassifier();
    const repository = new ApiMessageRepository(logger);
    
    // Мапа вхідних файлів до вихідних
    const files = new Map<string, string>([
      ["file1.txt", "out1.txt"],
      ["file2.txt", "out2.txt"],
      ["file3.txt", "out3.txt"],
    ]);
    
    // Створюємо обробники для кожного файлу
    const fileProcessors = new Map<string, FileProcessor>();
    
    for (const [input, output] of files.entries()) {
      // Створюємо процесор повідомлень для цього файлу
      const processor = new DelayedMessageProcessor(
        repository,
        classifier,
        logger,
        output
      );
      
      // Створюємо обробник файлу
      const fileProcessor = new FileProcessor(
        fileService,
        parser,
        processor,
        logger
      );
      
      // Додаємо до мапи
      fileProcessors.set(input, fileProcessor);
    }
    
    // Створюємо додаток
    return new App(fileProcessors, logger);
  }
} 