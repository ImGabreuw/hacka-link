import {Test, TestingModule} from '@nestjs/testing';
import {UserProfileService} from './user-profile.service';
import {ConfigModule} from "@nestjs/config";
import {FirebaseModule} from "../firebase/firebase.module";

describe('UserProfileService', () => {
    let service: UserProfileService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot(), FirebaseModule],
            providers: [
                UserProfileService],
        }).compile();

        service = module.get<UserProfileService>(UserProfileService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should save user profile', async () => {
        const result = await service.create({
            username: "Heitor",
            age: 20,
            learningMethod: "Aprendo vendo - Visual",
            contentStyleTitle: "Storytelling",
            contentStyleDescription: "Narração de histórias para transmitir uma mensagem, envolvendo personagens, enredo e emoções",
        });

        expect(result).toBeNull();
        expect(result?.trim()?.length).not.toBe(0);
    });

    it("should find user profile", async () => {
        const result = await service.findByUsername("Gabriel")

        expect(result).not.toBeNull();
    });
})
;
