import {Module} from '@nestjs/common';
import {OpenaiService} from "../openai/openai.service";
import {GenContentService} from './gen-content.service';
import {GenContentController} from './gen-content.controller';
import {ContentService} from "../content/content.service";
import {FirebaseModule} from "../firebase/firebase.module";
import {ImageProcessorService} from "../image-processor/image-processor.service";
import {UserProfileService} from "../user-profile/user-profile.service";

@Module({
    imports: [FirebaseModule],
    providers: [OpenaiService, ContentService, OpenaiService, GenContentService, ImageProcessorService, UserProfileService],
    controllers: [GenContentController],
})
export class GenContentModule {
}
