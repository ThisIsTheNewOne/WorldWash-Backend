import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { Membership } from './entities/membership.entity';
import { UserMembership } from './entities/user-membership.entity';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

@Controller('memberships')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMembership(
    // Requesting the current user in the endpoints
    @Request() req,
    @Body('type') type: string,
    @Body('price') price: number,
  ): Promise<Membership> {
    return await this.membershipService.createMembership(type, price, req);
  }


  @UseGuards(JwtAuthGuard)
  @Post(':userId/assign/:membershipId')
  async assignMembershipToUser(
    @Param('userId') userId: number,
    @Param('membershipId') membershipId: number,
  ): Promise<UserMembership> {
    return await this.membershipService.assignMembershipToUser(
      userId,
      membershipId,
    );
  }


  @UseGuards(JwtAuthGuard)
  @Get(':userId/current')
  async getCurrentMembership(
    @Param('userId') userId: number,
  ): Promise<UserMembership> {
    return await this.membershipService.getCurrentMembership(userId);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':userId/history')
  async getUserMemberships(
    @Param('userId') userId: number,
  ): Promise<UserMembership[]> {
    return await this.membershipService.getUserMemberships(userId);
  }

}
