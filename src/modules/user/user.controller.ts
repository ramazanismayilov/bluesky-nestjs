import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('users')
export class UserController {
    constructor(private UserService: UserService) { }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    list() {
        return this.UserService.list()
    }
}