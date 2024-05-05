import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Res
} from '@nestjs/common';
import {UserProfileService} from './user-profile.service';
import {CreateUserProfileDto} from "./dto/create-user-profile.dto";
import {Response} from 'express';

@Controller('user-profile')
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {
    }

    @Post()
    async save(@Res() response: Response,@Body() createUserProfileDto: CreateUserProfileDto) {
        const userProfile = await this.userProfileService.create(createUserProfileDto);

        if (userProfile == null) {
            throw new BadRequestException("User profile already exists");
        }

        return response.status(201).json(userProfile);
    }

    @Get()
    async findByUsername(@Res() response: Response, @Param() username: string) {
        const userProfile = await this.userProfileService.findByUsername(username);

        if (userProfile == null) {
            throw new NotFoundException('User profile not found.')
        }

        return response.status(200).json(userProfile);
    }
}
