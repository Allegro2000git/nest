import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import {v4} from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const fileName = v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');

      await fs.mkdir(filePath, { recursive: true });
      await fs.writeFile(path.join(filePath, fileName), file.buffer);

      return fileName;

    } catch (e) {
      console.error('Ошибка в FilesService:', e);
      throw new HttpException('Произошла ошибка при записи файлов', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
