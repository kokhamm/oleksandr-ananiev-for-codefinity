import { IMessage, IMessageTypeClassifier } from "../interfaces";

/**
 * Клас, що класифікує повідомлення за їх довжиною
 */
export class LengthBasedMessageTypeClassifier implements IMessageTypeClassifier {
  private readonly threshold: number;
  private readonly longType: string;
  private readonly shortType: string;

  /**
   * Створює новий класифікатор
   * @param threshold - порогове значення довжини
   * @param longType - тип для довгих повідомлень
   * @param shortType - тип для коротких повідомлень
   */
  constructor(threshold: number = 8, longType: string = "long", shortType: string = "short") {
    this.threshold = threshold;
    this.longType = longType;
    this.shortType = shortType;
  }

  /**
   * Класифікує повідомлення і встановлює йому тип
   */
  classify(message: IMessage): void {
    const type = message.getMessage().length > this.threshold
      ? this.longType
      : this.shortType;
    
    message.setType(type);
  }
} 