

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { ProfilePictureEntry } from '../../profile-picture/entities/profile-picture.entity'
import { Role } from '../../users/Role';
import { UserMembership } from 'src/membership/entities/user-membership.entity';

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
    // default: [Role.User]
    default: Role.User
  })
  role: Role;

  @OneToOne(() => ProfilePictureEntry, (profilePicture) => profilePicture.user)
  profilePicture: ProfilePictureEntry;

  @OneToMany(() => UserMembership, (userMembership) => userMembership.user)
  memberships: UserMembership[];
}