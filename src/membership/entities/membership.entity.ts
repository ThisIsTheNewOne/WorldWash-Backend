import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserMembership } from './user-membership.entity';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  price: number;

  @OneToMany(() => UserMembership, (userMembership) => userMembership.membership)
  userMemberships: UserMembership[];
}