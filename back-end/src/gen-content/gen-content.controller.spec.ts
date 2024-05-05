import { Test, TestingModule } from '@nestjs/testing';
import { GenContentController } from './gen-content.controller';

describe('GenContentController', () => {
  let controller: GenContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenContentController],
    }).compile();

    controller = module.get<GenContentController>(GenContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
