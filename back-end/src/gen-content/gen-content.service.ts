import {Injectable} from '@nestjs/common';
import {OpenaiService} from "../openai/openai.service";
import {UserProfileService} from "../user-profile/user-profile.service";
import {ImageContentGenerationDto} from "./dto/image-content-generation.dto";
import {TextContentGenerationDto} from "./dto/text-content-generation.dto";

@Injectable()
export class GenContentService {
    constructor(
        private readonly userProfileService: UserProfileService,
        private readonly openiaService: OpenaiService
    ) {
    }

    async image_generation({ username, imageEncoded }: ImageContentGenerationDto
    ) {
        const userProfile = await this.userProfileService.findByUsername(username)

        if (!userProfile) {
            return null;
        }

        const content = await this.openiaService.getEncodedImageContent(imageEncoded);
        return await this.openiaService.generateStorytelling(username, userProfile.age, content)
    }

    async text_generation({username, text }: TextContentGenerationDto
    ) {
        const userProfile = await this.userProfileService.findByUsername(username)

        if (!userProfile) {
            return null;
        }

        const content = await this.openiaService.generateStorytelling(username, userProfile.age, text);
        return await this.openiaService.generateStorytelling(username, userProfile.age, content)
    }
}
