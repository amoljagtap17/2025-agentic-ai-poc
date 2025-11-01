import { Test, TestingModule } from '@nestjs/testing';
import { PortfoliosSubgraphController } from './portfolios-subgraph.controller';
import { PortfoliosSubgraphService } from './portfolios-subgraph.service';

describe('PortfoliosSubgraphController', () => {
  let portfoliosSubgraphController: PortfoliosSubgraphController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PortfoliosSubgraphController],
      providers: [PortfoliosSubgraphService],
    }).compile();

    portfoliosSubgraphController = app.get<PortfoliosSubgraphController>(PortfoliosSubgraphController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(portfoliosSubgraphController.getHello()).toBe('Hello World!');
    });
  });
});
