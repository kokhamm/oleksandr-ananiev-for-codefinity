/**
 * Інтерфейс, що визначає сервіс для роботи з файлами
 */
export interface IFileService {
  /**
   * Зчитує вміст файлу за шляхом
   */
  readFile(filePath: string): Promise<string>;
  
  /**
   * Записує дані у файл
   */
  writeFile(filePath: string, data: string): Promise<void>;
} 