import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from './role';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id/role')
  async updateRole(@Param('id') id: number, @Body('role') role: Role) {
    return this.usersService.updateRole(id, role);
  }
}