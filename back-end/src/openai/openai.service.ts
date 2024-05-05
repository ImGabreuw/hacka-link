import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import OpenAI from "openai";
import {ImageProcessorService} from "../image-processor/image-processor.service";

@Injectable()
export class OpenaiService {
    private openai: OpenAI

    constructor(
        private readonly configService: ConfigService,
        private readonly imageProcessorService: ImageProcessorService
    ) {
        const apiKey = configService.get<string>("OPENAI_API_KEY")
        this.openai = new OpenAI({apiKey});
    }

    async getImageContent(filename: string): Promise<string> {
        const encodedImage = this.imageProcessorService.getImageBase64(filename);
        const chatCompletion = await this.openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Extraia os conteúdos da imagem.",
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: {
                                url: encodedImage,
                                detail: "low"
                            }
                        }
                    ]
                }
            ],
            model: "gpt-4-vision-preview",
        });

        return chatCompletion.choices[0].message.content
    }
}
