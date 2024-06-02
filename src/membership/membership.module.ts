import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { UserEntity } from 'src/authentication/entities/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { UserMembership } from './entities/user-membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, Membership, UserMembership])],
  controllers: [MembershipController],
  providers: [MembershipService],
})
export class MembershipModule {}
