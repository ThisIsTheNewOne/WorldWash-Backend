import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { UserEntity } from "../../authentication/entities/user";

@Entity()
export class ProfilePictureEntry {
    @PrimaryGeneratedColumn()
    id: number

    @Column() 
    profilePhoto: string

    @OneToOne(() => UserEntity, (user) => user.profilePicture)
    @JoinColumn() 
    user: UserEntity;
}
