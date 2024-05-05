import {Module} from '@nestjs/common';
import {OpenaiService} from './openai.service';
import {ConfigService} from "@nestjs/config";
import {ImageProcessorService} from "../image-processor/image-processor.service";
import {ContentService} from "../content/content.service";
import {FirebaseModule} from "../firebase/firebase.module";

@Module({
    imports: [FirebaseModule],
    providers: [OpenaiService, ConfigService, ImageProcessorService, ContentService],
})
export class OpenaiModule {
}
