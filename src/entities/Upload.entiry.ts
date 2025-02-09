import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("uplaods")
export class UploadEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}