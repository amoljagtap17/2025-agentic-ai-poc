import { Injectable } from '@nestjs/common';

@Injectable()
export class SecuritiesSubgraphService {
  getHello(): string {
    return 'Hello World!';
  }
}
