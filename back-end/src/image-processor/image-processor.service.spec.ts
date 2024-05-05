import {Test, TestingModule} from '@nestjs/testing';
import {ImageProcessorService} from './image-processor.service';

describe('ImageProcessorService', () => {
    let service: ImageProcessorService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ImageProcessorService],
        }).compile();

        service = module.get<ImageProcessorService>(ImageProcessorService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should convert an image to base64', () => {
        const base64 = service.getImageBase64("segunda_lei_newton.png")
        expect(base64).toBeDefined()
    });
});
