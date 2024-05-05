import {Module} from '@nestjs/common';
import {OpenaiService} from './openai.service';
import {ConfigService} from "@nestjs/config";
import {ImageProcessorService} from "../image-processor/image-processor.service";

@Module({
    providers: [OpenaiService, ConfigService, ImageProcessorService],
})
export class OpenaiModule {
}
