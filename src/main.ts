import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5004;

  await app.listen(PORT, () => console.log(`PORT was started on ${PORT}`))
}

start();