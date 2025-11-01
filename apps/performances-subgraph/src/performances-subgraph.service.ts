import { Injectable } from '@nestjs/common';

@Injectable()
export class PerformancesSubgraphService {
  getHello(): string {
    return 'Hello World!';
  }
}
