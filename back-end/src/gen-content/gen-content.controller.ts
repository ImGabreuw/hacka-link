import {Body, Controller, Post} from '@nestjs/common';
import {GenContentService} from "./gen-content.service";
import {ImageContentGenerationDto} from "./dto/image-content-generation.dto";
import {TextContentGenerationDto} from "./dto/text-content-generation.dto";

@Controller('generation')
export class GenContentController {

    constructor(
        private readonly genContentService: GenContentService,
    ) {
    }

    @Post("image")
    async image_generation(@Body() imageContentGenerationDto: ImageContentGenerationDto) {
        return await this.genContentService.image_generation(imageContentGenerationDto);
    }

    @Post("text")
    async text_generation(@Body() textContentGenerationDto: TextContentGenerationDto) {
        return await this.genContentService.text_generation(textContentGenerationDto)
    }

}
