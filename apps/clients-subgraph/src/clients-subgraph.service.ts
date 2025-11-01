import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientsSubgraphService {
  getHello(): string {
    return 'Hello World!';
  }
}
