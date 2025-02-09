import { hash } from "bcrypt";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UploadEntity } from "./Upload.entiry";

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    birthDate: Date

    @OneToOne(() => UploadEntity, { nullable: true })
    @JoinColumn()
    profilePicture: UploadEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async beforeSave() {
        if (!this.password) return
        this.password = await hash(this.password, 10)
    }
}