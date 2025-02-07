import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAlphanumeric, IsDateString, IsEmail, IsString, Length } from "class-validator";

export class AuthRegisterDto {
    @Type(() => String)
    @IsString()
    @Length(3, 18)
    @IsAlphanumeric()
    @ApiProperty({default: 'johndoe'})
    username: string

    @Type(() => String)
    @IsEmail()
    @ApiProperty({default: 'johndoe@email.com'})
    email: string

    @Type(() => String)
    @IsString()
    @Length(6, 20)
    @ApiProperty({default: 'johndoe123'})
    password: string

    @Type(() => String)
    @IsDateString()
    @ApiProperty({default: '1990-01-01'})
    birthDate: string
}