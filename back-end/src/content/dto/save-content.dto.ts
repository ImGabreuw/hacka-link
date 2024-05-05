import {IsNotEmpty} from "class-validator";

export class SaveContentDto {
    username: string
    prompt: string
    text: string
}
