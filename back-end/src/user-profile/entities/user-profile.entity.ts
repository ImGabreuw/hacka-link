import {IsDefined, IsIn, IsNotEmpty} from "class-validator";

export class UserProfile {
    @IsNotEmpty()
    username: string

    @IsIn(["Aprendo vendo - Visual", "Aprendo ouvindo - Auditivo", "Aprendo fazendo - Cinestésico"])
    learningMethod: string

    @IsDefined()
    contentStyleTitle: string

    @IsDefined()
    contentStyleDescription: string

}