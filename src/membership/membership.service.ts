import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMembership } from './entities/user-membership.entity';
import { Membership } from './entities/membership.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/authentication/entities/user';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(UserMembership)
    private readonly userMembershipRepository: Repository<UserMembership>,
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createMembership(type: string, price: number, req: any): Promise<Membership> {
    console.log("THis is how I request the current user in an endpoint", req)
    const membership = this.membershipRepository.create({ type, price });
    return await this.membershipRepository.save(membership);
  }

  async getCurrentMembership(userId: number): Promise<UserMembership> {
    return await this.userMembershipRepository.findOne({
      where: { user: { id: userId }, isCurrent: true },
      relations: ['membership'],
    });
  }

  async getUserMemberships(userId: number): Promise<UserMembership[]> {
    return await this.userMembershipRepository.find({
      where: { user: { id: userId } },
      relations: ['membership'],
    });
  }

  async assignMembershipToUser(userId: number, membershipId: number): Promise<UserMembership> {
    const user = await this.userRepository.findOneBy({ id: userId });
   
    if (!user) {
      throw new Error('User not found');
    }
    
    const membership = await this.membershipRepository.findOneBy({ id: membershipId });
    if (!membership) {
      throw new Error('Membership not found');
    }

    const userMembership = this.userMembershipRepository.create({
      user,
      membership,
      isCurrent: true,
    });

    // Mark previous memberships as not current
    await this.userMembershipRepository.update(
      { user, isCurrent: true },
      { isCurrent: false },
    );

    return await this.userMembershipRepository.save(userMembership);
  }

}
