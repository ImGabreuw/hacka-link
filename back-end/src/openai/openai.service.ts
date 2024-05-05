import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import OpenAI from "openai";
import {ImageProcessorService} from "../image-processor/image-processor.service";

@Injectable()
export class OpenaiService {
    private readonly PROMPT = `Liste em itens os textos dos tópicos presentes na imagem. 
Na resposta não deve conter:
- Conteúdo que não esteja na imagem. 
- Comentários adicionais, como obsevações e saudações.`

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
                    content: this.PROMPT,
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


    async getEncodedImageContent(encodedImage: string): Promise<string> {
        const chatCompletion = await this.openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: this.PROMPT,
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
