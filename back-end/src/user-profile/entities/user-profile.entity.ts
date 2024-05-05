import {IsDefined, IsIn, IsNotEmpty, IsNumber} from "class-validator";

export class UserProfile {
    @IsNotEmpty()
    username: string

    @IsNumber()
    age: number

    @IsIn(["Aprendo vendo - Visual", "Aprendo ouvindo - Auditivo", "Aprendo fazendo - Cinestésico"])
    learningMethod: string

    @IsDefined()
    contentStyleTitle: string

    @IsDefined()
    contentStyleDescription: string

}