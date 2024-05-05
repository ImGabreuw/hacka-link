import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import {FirebaseModule} from "../firebase/firebase.module";

@Module({
  imports: [FirebaseModule],
  providers: [ContentService],
})
export class ContentModule {}
