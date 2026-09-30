import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAllUsers() {
    return [{ id: '1', name: 'Oleg' }];
  }
}