import {BadGatewayException, Body, Controller, Post, Res} from '@nestjs/common';
import {GenContentService} from "./gen-content.service";
import {ImageContentGenerationDto} from "./dto/image-content-generation.dto";
import {TextContentGenerationDto} from "./dto/text-content-generation.dto";
import {Response} from "express";

@Controller('generation')
export class GenContentController {

    constructor(
        private readonly genContentService: GenContentService,
    ) {
    }

    @Post("image")
    async image_generation(
        @Res() response: Response,
        @Body() imageContentGenerationDto: ImageContentGenerationDto
    ) {
        const content = await this.genContentService.image_generation(imageContentGenerationDto);

        if (content == null) {
            throw new BadGatewayException("Image generation failed");
        }

        return response.status(200).json(content);
    }

    @Post("text")
    async text_generation(
        @Res() response: Response,
        @Body() textContentGenerationDto: TextContentGenerationDto
    ) {
        const content = await this.genContentService.text_generation(textContentGenerationDto);

        if (content == null) {
            throw new BadGatewayException("Text generation failed");
        }

        return response.status(200).json(content);
    }

}
