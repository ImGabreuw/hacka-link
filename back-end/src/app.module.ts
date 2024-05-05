import {Module} from '@nestjs/common';
import {OpenaiModule} from './openai/openai.module';
import {ImageProcessorModule} from './image-processor/image-processor.module';
import {ConfigModule} from "@nestjs/config";
import { UserProfileModule } from './user-profile/user-profile.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}), OpenaiModule, ImageProcessorModule, UserProfileModule, FirebaseModule],
})
export class AppModule {
}
