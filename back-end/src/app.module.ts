import {Module} from '@nestjs/common';
import {OpenaiModule} from './openai/openai.module';
import {ImageProcessorModule} from './image-processor/image-processor.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}), OpenaiModule, ImageProcessorModule],
})
export class AppModule {
}
