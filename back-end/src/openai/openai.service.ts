import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import OpenAI from "openai";
import {ImageProcessorService} from "../image-processor/image-processor.service";
import {ContentService} from "../content/content.service";

@Injectable()
export class OpenaiService {
    private static readonly EXTRACT_CONTENT_PROMPT = `Liste em itens os textos dos tópicos presentes na imagem. 
Na resposta não deve conter:
- Conteúdo que não esteja na imagem. 
- Comentários adicionais, como obsevações e saudações.`

    private openai: OpenAI

    constructor(
        private readonly configService: ConfigService,
        private readonly imageProcessorService: ImageProcessorService,
        private readonly contentService: ContentService
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
                    content: OpenaiService.EXTRACT_CONTENT_PROMPT,
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

        return chatCompletion.choices[0].message.content;
    }


    async getEncodedImageContent(encodedImage: string): Promise<string> {
        const chatCompletion = await this.openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: OpenaiService.EXTRACT_CONTENT_PROMPT,
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

    async generateStorytelling(username: string, userAge: number, content: string) : Promise<string | null> {
        if (!content) {
            return null;
        }

        const prompt = `Explique esse trecho usando storytelling 
        de uma forma que um adolescente de ${userAge} anos consiga entender, inclua todas as informações
        e detalhes do trecho, mas não seja longo, use a quantidade necessária para transmitir todas as informações, 
        não omita termos importantes para a matéria do trecho:
        ${content}`

        const chatCompletion = await this.openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            model: "gpt-3.5-turbo",
        });

        const response = chatCompletion.choices[0].message.content

        await this.contentService.save({
            username,
            prompt,
            text: response
        })

        return response;
    }

}
