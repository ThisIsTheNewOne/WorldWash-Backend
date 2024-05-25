import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { UserEntity } from "src/authentication/entities/user";

@Entity()
export class ProfilePictureEntry {
    @PrimaryGeneratedColumn()
    id: number

    @Column() 
    profilePhoto: string

    @OneToOne(() => UserEntity)
    @JoinColumn() // This decorator is used to specify that this side owns the relationship
    user: UserEntity;
}
