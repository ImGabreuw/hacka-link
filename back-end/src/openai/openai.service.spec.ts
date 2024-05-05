import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiService } from './openai.service';
import {ConfigModule} from "@nestjs/config";
import {ImageProcessorService} from "../image-processor/image-processor.service";

describe('OpenaiService', () => {
  let service: OpenaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [OpenaiService, ImageProcessorService],
    }).compile();

    service = module.get<OpenaiService>(OpenaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should extract image content in low resolution', async () => {
    const imageContent = await service.getImageContent("segunda_lei_newton.png");
    console.log(imageContent);
    expect(imageContent).toBeDefined();
    expect(imageContent.trim().length).not.toBe(0);
  }, 60 * 1000);
});
