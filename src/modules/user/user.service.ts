import { Controller, Get, Injectable, Post } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/User.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) { }

    list() {
        return this.userRepo.find()
    }

    findUserById(id: number) {
        return this.userRepo.findOne({ where: { id } })
    }
}