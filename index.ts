import { AppFactory } from './models';

const main = async () => {
  // Створюємо додаток за допомогою фабрики
  const app = new AppFactory().create();
  
  // Запускаємо обробку
  await app.run();
};

// Запускаємо головну функцію
main().catch(error => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
 
