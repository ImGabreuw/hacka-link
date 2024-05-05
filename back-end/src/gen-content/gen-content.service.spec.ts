import {Test, TestingModule} from '@nestjs/testing';
import {GenContentService} from './gen-content.service';
import {FirebaseModule} from "../firebase/firebase.module";
import {UserProfileService} from "../user-profile/user-profile.service";
import {OpenaiService} from "../openai/openai.service";
import {ConfigService} from "@nestjs/config";
import {ImageProcessorService} from "../image-processor/image-processor.service";
import {ContentService} from "../content/content.service";

describe('GenContentService', () => {
    let service: GenContentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FirebaseModule],
            providers: [ConfigService, ImageProcessorService, GenContentService, UserProfileService, OpenaiService, ContentService],
        }).compile();

        service = module.get<GenContentService>(GenContentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should generate text content', async () => {
        const content = await service.text_generation({
          username: "Gabriel",
          text: "Faça uma introdução sobre classes em Python."
        });

        console.log(content);

        expect(content).not.toBeNull();
        expect(content.trim().length).toBe(0);
    });
});
