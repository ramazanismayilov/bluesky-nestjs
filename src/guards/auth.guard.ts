import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let request = context.switchToHttp().getRequest()
        let token = request.headers.authorization || ""
        token = token.split(" ")[1]
        if (!token) throw new UnauthorizedException("Unauthorized")

        try {
            let payload = this.jwtService.verify(token)
            if (!payload.userId) throw new UnauthorizedException("Invalid token");

            let user = await this.userService.findUserById(payload.userId);
            if (!user) throw new UnauthorizedException("User not found");

            request["user"] = user
            return true
        } catch (error) {
            throw new UnauthorizedException(error.message || "Unauthorized")
        }
    }
}