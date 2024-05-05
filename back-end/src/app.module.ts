import {Module} from '@nestjs/common';
import {OpenaiModule} from './openai/openai.module';
import {ImageProcessorModule} from './image-processor/image-processor.module';
import {ConfigModule} from "@nestjs/config";
import {UserProfileModule} from './user-profile/user-profile.module';
import {FirebaseModule} from './firebase/firebase.module';
import {GenContentModule} from './gen-content/gen-content.module';
import { ContentModule } from './content/content.module';

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}), OpenaiModule, ImageProcessorModule, UserProfileModule, FirebaseModule, GenContentModule, ContentModule],
})
export class AppModule {
}
