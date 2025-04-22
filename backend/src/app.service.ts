import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isAlive(): string {
    return `Server is alive & running on port ${process.env.PORT}`;
  }
}
