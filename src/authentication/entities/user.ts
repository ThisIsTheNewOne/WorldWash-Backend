

import { Role } from './../../users/Role';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ProfilePictureEntry } from '../../profile-picture/entities/profile-picture.entity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type:"enum", 
    enum: Role, 
    default: [Role.User]
  })
  role: Role;

  @OneToOne(() => ProfilePictureEntry, (profilePicture) => profilePicture.user)
  profilePicture: ProfilePictureEntry;
}