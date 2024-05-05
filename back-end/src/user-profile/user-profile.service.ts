import {Inject, Injectable} from '@nestjs/common';
import {CreateUserProfileDto} from './dto/create-user-profile.dto';

import {addDoc, collection, Firestore, getDocs, query, where} from "firebase/firestore";
import {UserProfile} from "./entities/user-profile.entity";

@Injectable()
export class UserProfileService {
    constructor(
        @Inject("Firestore")
        private readonly firestore: Firestore
    ) {
    }

    async create({username, age, learningMethod, contentStyleTitle, contentStyleDescription}: CreateUserProfileDto) {
        const userProfile = await this.findByUsername(username);

        if (userProfile) {
            return null;
        }

        const {id} = await addDoc(
            collection(this.firestore, "user_profiles"),
            {
                username,
                age,
                learningMethod,
                contentStyleTitle,
                contentStyleDescription
            } as UserProfile
        );
        return id;
    }

    async findByUsername(username: string) {
        const q = query(collection(this.firestore, "user_profiles"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data() as UserProfile;
        }
        return null;
    }
}
