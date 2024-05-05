import {Module} from "@nestjs/common";
import {FirebaseOptions, initializeApp, FirebaseApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: "Firestore",
            useFactory: async (configService: ConfigService) => {
                const firebaseConfig: FirebaseOptions = {
                    apiKey: configService.get<string>("FIREBASE_API_KEY"),
                    authDomain: configService.get<string>("FIREBASE_AUTH_DOMAIN"),
                    projectId: configService.get<string>("FIREBASE_PROJECT_ID"),
                    storageBucket: configService.get<string>("FIREBASE_STORAGE_BUCKET"),
                    messagingSenderId: configService.get<string>("FIREBASE_MESSAGING_SENDER_ID"),
                    appId: configService.get<string>("FIREBASE_APP_ID"),
                };

                const app = initializeApp(firebaseConfig);
                return getFirestore(app);
            },
            inject: [ConfigService],
        },
    ],
    exports: ["Firestore"],
})
export class FirebaseModule {
}
