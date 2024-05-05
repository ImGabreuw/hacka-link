import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserProfileService} from './user-profile.service';
import {CreateUserProfileDto} from './dto/create-user-profile.dto';
import {FindUserProfileDto} from "./dto/find-user-profile.dto";

@Controller('user-profile')
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {
    }

    @Post()
    async create(@Body() createUserProfileDto: CreateUserProfileDto) {
        return this.userProfileService.create(createUserProfileDto);
    }

    @Get()
    async findByUsername(@Body() {username}: FindUserProfileDto) {
        return await this.userProfileService.findByUsername(username);
    }
}
