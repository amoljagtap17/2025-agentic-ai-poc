import { Test, TestingModule } from '@nestjs/testing';
import { ClientsSubgraphController } from './clients-subgraph.controller';
import { ClientsSubgraphService } from './clients-subgraph.service';

describe('ClientsSubgraphController', () => {
  let clientsSubgraphController: ClientsSubgraphController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClientsSubgraphController],
      providers: [ClientsSubgraphService],
    }).compile();

    clientsSubgraphController = app.get<ClientsSubgraphController>(ClientsSubgraphController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(clientsSubgraphController.getHello()).toBe('Hello World!');
    });
  });
});
