import {Body, Controller, Get} from '@nestjs/common';
import {UserProfileService} from './user-profile.service';
import {FindUserProfileDto} from "./dto/find-user-profile.dto";

@Controller('user-profile')
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {
    }

    @Get()
    async findByUsername(@Body() {username}: FindUserProfileDto) {
        return await this.userProfileService.findByUsername(username);
    }
}
