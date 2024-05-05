import {IsNotEmpty} from "class-validator";

export class Content {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    prompt: string

    @IsNotEmpty()
    text: string
}
