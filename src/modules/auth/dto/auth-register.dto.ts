import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAlphanumeric, IsDateString, IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class AuthRegisterDto {
    @Type(() => String)
    @IsString()
    @Length(3, 18)
    @IsAlphanumeric()
    @ApiProperty({ default: 'johndoe' })
    username: string

    @Type(() => String)
    @IsEmail()
    @ApiProperty({ default: 'johndoe@email.com' })
    email: string

    @Type(() => String)
    @IsString()
    @Length(6, 20)
    @ApiProperty({ default: 'johndoe123' })
    password: string

    @Type(() => String)
    @IsOptional()
    @IsDateString()
    @ApiProperty({ default: '1990-01-01', required: false })
    birthDate: string

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @ApiProperty({ default: 1, required: false })
    profilePictureId?: number;
}