import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  type PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // 1. Если значения вообще нет (undefined/null), сразу возвращаем его,
    // чтобы не передавать в validate() и не вызывать падение.
    if (!value || !metadata.metatype || value.constructor?.name === 'Object') {
      return value;
    }

    // 2. Трансформируем в экземпляр класса DTO
    const obj = plainToInstance(metadata.metatype, value);

    // Дополнительная защитная проверка перед валидацией
    if (!obj || typeof obj !== 'object') {
      return value;
    }

    // 3. Валидируем объект
    const errors = await validate(obj);

    // 4. Если есть ошибки, выбрасываем BadRequestException
    if (errors.length > 0) {
      const messages = errors.map(
        (err) =>
          `${err.property} - ${Object.values(err.constraints || {}).join(', ')}`,
      );
      throw new BadRequestException({
        message: 'Validation failed',
        errors: messages,
      });
    }

    return obj;
  }
}
