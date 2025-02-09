import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadEntity } from "src/entities/Upload.entiry";

@Module({
    imports: [TypeOrmModule.forFeature([UploadEntity])],
    controllers: [UploadController],
    providers: [UploadService]
})
export class UploadModule { }