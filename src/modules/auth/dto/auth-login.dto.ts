import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAlphanumeric, IsEmail, IsString, Length } from "class-validator";

export class AuthLoginDto {
    @Type(() => String)
    @IsString()
    @Length(3, 18)
    @IsAlphanumeric()
    @ApiProperty({ default: 'johndoe' })
    usernameOrEmail: string

    @Type(() => String)
    @IsString()
    @Length(6, 20)
    @ApiProperty({ default: 'johndoe123' })
    password: string
}