import {Module} from '@nestjs/common';
import {OpenaiService} from './openai.service';
import {ConfigService} from "@nestjs/config";
import {ImageProcessorService} from "../image-processor/image-processor.service";
import { OpenaiController } from './openai.controller';

@Module({
    providers: [OpenaiService, ConfigService, ImageProcessorService],
    controllers: [OpenaiController],
})
export class OpenaiModule {
}
