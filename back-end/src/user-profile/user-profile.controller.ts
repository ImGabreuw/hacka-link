import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserProfileService} from './user-profile.service';
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
    async findByUsername(@Param('username') username: string) {
        return await this.userProfileService.findByUsername(username);
    }
}
