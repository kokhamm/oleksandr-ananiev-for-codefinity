/**
 * Інтерфейс, що визначає додаток
 */
export interface IApp {
  /**
   * Запускає обробку файлів
   */
  run(): Promise<void>;
}

/**
 * Інтерфейс, що визначає фабрику додатків
 */
export interface IAppFactory {
  /**
   * Створює екземпляр додатку
   */
  create(): IApp;
} 