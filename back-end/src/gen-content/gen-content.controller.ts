import {Body, Controller, Post} from '@nestjs/common';
import {GenContentService} from "./gen-content.service";
import {GenerateContentDto} from "./dto/generate-content.dto";

@Controller('content')
export class GenContentController {

    constructor(
        private readonly genContentService: GenContentService,
    ) {
    }

    @Post("generation")
    async generation(@Body() generateContentDto: GenerateContentDto) {
        return this.genContentService.generation(generateContentDto);
    }

}
