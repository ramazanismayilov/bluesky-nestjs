import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { compare } from 'bcrypt';
import config from 'src/config';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
        private jwtService: JwtService
    ) { }

    async login(params: AuthLoginDto) {
        let user: any;

        if (params.usernameOrEmail.includes('@')) {
            user = await this.userRepo.findOne({
                where: { email: params.usernameOrEmail },
            });
        } else {
            user = await this.userRepo.findOne({
                where: { username: params.usernameOrEmail },
            });
        }

        if (!user) {
            throw new NotFoundException("Username or email is wrong");
        }

        let checkPassword = await compare(params.password, user.password);

        if (!checkPassword) {
            throw new UnauthorizedException('Username, email, or password is wrong');
        }

        let token = this.jwtService.sign(
            { userId: user.id },
            { secret: config.jwtSecret }
        );

        return {
            message: "Login is successfully",
            user: {
                ...user,
                password: undefined,
            },
            token,
        };
    }

    async register(params: AuthRegisterDto) {
        let checkUsername = await this.userRepo.exists({
            where: { username: params.username }
        })
        if (checkUsername) throw new ConflictException("Username is already exists")

        let checkEmail = await this.userRepo.exists({
            where: { email: params.email }
        })
        if (checkEmail) throw new ConflictException("Email is already exists")

        let user = this.userRepo.create(params)
        await user.save()
        return {
            message: "Registration is successfully",
            user
        }
    }
}
