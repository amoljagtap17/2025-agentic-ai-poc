import { Test, TestingModule } from '@nestjs/testing';
import { SecuritiesSubgraphController } from './securities-subgraph.controller';
import { SecuritiesSubgraphService } from './securities-subgraph.service';

describe('SecuritiesSubgraphController', () => {
  let securitiesSubgraphController: SecuritiesSubgraphController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SecuritiesSubgraphController],
      providers: [SecuritiesSubgraphService],
    }).compile();

    securitiesSubgraphController = app.get<SecuritiesSubgraphController>(SecuritiesSubgraphController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(securitiesSubgraphController.getHello()).toBe('Hello World!');
    });
  });
});
