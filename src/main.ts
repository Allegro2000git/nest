import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5004;

  const config = new DocumentBuilder()
    .setTitle('nest practice')
    .setDescription('Документация по REST API')
    .setVersion('1.0.0')
    .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document) // строчки 10-18 отвечают за создание документации для Swagger

  await app.listen(PORT, () => console.log(`PORT was started on ${PORT}`))
}

start();