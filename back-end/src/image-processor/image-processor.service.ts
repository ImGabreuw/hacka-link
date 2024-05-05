import {Injectable} from '@nestjs/common';
import * as fs from "fs";

@Injectable()
export class ImageProcessorService {
    getImageBase64(filename: string): string {
        const imageBuffer = fs.readFileSync(`resources/${filename}`);
        return `data:image/png;base64,${imageBuffer.toString('base64')}`;
    }
}
