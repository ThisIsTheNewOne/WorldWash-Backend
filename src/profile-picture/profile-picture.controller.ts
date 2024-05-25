import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  NotFoundException,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ProfilePictureService } from './profile-picture.service';
import { CreateProfilePictureDto } from './dto/create-profile-picture.dto';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@Controller('profile-picture')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @UseGuards(JwtAuthGuard)
  @Post('protected-endpoint')
  testProtectedEndpoint() {
    console.log('You got through the gate');
    return { message: 'You got through the gate' };
  }

  @Post()
  async create(@Body() createEntryDto: CreateProfilePictureDto) {
    try {
      const display_url = await this.profilePictureService.saveImage(
        createEntryDto.ProfilePicture,
        createEntryDto.UserId,
      );
      return this.profilePictureService.create(createEntryDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('An unexpected error occurred');
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getProfilePicture(@Param('userId') userId: string) {
    try {
      const profilePicture =
        await this.profilePictureService.getProfilePictureByUserId(userId);
      const returnOnlyLink = profilePicture.profilePhoto;
      return { profilePhoto: returnOnlyLink };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('An unexpected error occurred');
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async deleteProfilePicture(@Param('userId') userId: string) {
    try {
      const test = await this.profilePictureService.deleteProfilePicture(userId);
      console.log("Profile picture fetched successfully:", test);
      return test
    } catch (error) {
      console.log("Profile picture fetched successfully:", error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('An unexpected error occurred');
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Put(':userId')
  async updateProfilePicture(@Param('userId') userId: string, @Body() updateEntryDto: CreateProfilePictureDto) {
    try {
      const test = await this.profilePictureService.updateProfilePicture(userId, updateEntryDto.ProfilePicture);
      return { profilePhoto: test };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('An unexpected error occurred');
    }
  }
}
