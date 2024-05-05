import {Inject, Injectable} from '@nestjs/common';
import {addDoc, collection, Firestore} from "firebase/firestore";
import {SaveContentDto} from "./dto/save-content.dto";
import {Content} from "./entities/content.entity";

@Injectable()
export class ContentService {
    constructor(
        @Inject("Firestore")
        private readonly firestore: Firestore
    ) {
    }

    async save({username, prompt, text}: SaveContentDto) {
        const {id} = await addDoc(
            collection(this.firestore, "contents"),
            {
                username,
                prompt,
                text
            } as Content
        );
        return id;
    }

}
