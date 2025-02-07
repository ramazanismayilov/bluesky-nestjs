import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { CloudinaryModule } from "src/libs/cloudinary/cloudinary.module";
import { UploadService } from "./upload.service";

@Module({
    imports: [CloudinaryModule],
    controllers: [UploadController],
    providers: [UploadService]
})
export class UploadModule { }