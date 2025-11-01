import { Test, TestingModule } from '@nestjs/testing';
import { PerformancesSubgraphController } from './performances-subgraph.controller';
import { PerformancesSubgraphService } from './performances-subgraph.service';

describe('PerformancesSubgraphController', () => {
  let performancesSubgraphController: PerformancesSubgraphController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PerformancesSubgraphController],
      providers: [PerformancesSubgraphService],
    }).compile();

    performancesSubgraphController = app.get<PerformancesSubgraphController>(PerformancesSubgraphController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(performancesSubgraphController.getHello()).toBe('Hello World!');
    });
  });
});
