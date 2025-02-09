import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UploadEntity } from 'src/entities/Upload.entiry';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UploadEntity])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
