import {Injectable} from '@nestjs/common';
import {OpenaiService} from "../openai/openai.service";
import {UserProfileService} from "../user-profile/user-profile.service";
import {GenerateContentDto} from "./dto/generate-content.dto";

@Injectable()
export class GenContentService {
    constructor(
        private readonly userProfileService: UserProfileService,
        private readonly openiaService: OpenaiService
    ) {
    }

    async generation({
                         username,
                         imageEncoded
                     }: GenerateContentDto
    ) {
        const userProfile = await this.userProfileService.findByUsername(username)

        if (!userProfile) {
            return null;
        }

        const content = await this.openiaService.getEncodedImageContent(imageEncoded);
        return await this.openiaService.generateStorytelling(username, userProfile.age, content)
    }
}
