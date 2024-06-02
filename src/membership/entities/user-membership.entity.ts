import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Membership } from './membership.entity';
import { UserEntity } from 'src/authentication/entities/user';


@Entity()
export class UserMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.memberships)
  user: UserEntity;

  @ManyToOne(() => Membership, (membership) => membership.userMemberships)
  membership: Membership;

  @Column({ default: false })
  isCurrent: boolean;

  @CreateDateColumn()
  createdAt: Date;
}