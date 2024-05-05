import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserProfileService} from './user-profile.service';
import {FindUserProfileDto} from "./dto/find-user-profile.dto";
import {CreateUserProfileDto} from "./dto/create-user-profile.dto";

@Controller('user-profile')
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {
    }

    @Post()
    async save(@Body() createUserProfileDto: CreateUserProfileDto) {
        return await this.userProfileService.create(createUserProfileDto);
    }

    @Get()
    async findByUsername(@Body() {username}: FindUserProfileDto) {
        return await this.userProfileService.findByUsername(username);
    }
}
