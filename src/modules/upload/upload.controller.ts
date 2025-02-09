import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { FileUploadDto } from "./dto/upload-file.dto";
import { UploadService } from "./upload.service";

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) { }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: FileUploadDto })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.uploadService.uploadFile(file);
    }
}
