import { Test, TestingModule } from '@nestjs/testing';
import { GenContentService } from './gen-content.service';

describe('GenContentService', () => {
  let service: GenContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenContentService],
    }).compile();

    service = module.get<GenContentService>(GenContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
