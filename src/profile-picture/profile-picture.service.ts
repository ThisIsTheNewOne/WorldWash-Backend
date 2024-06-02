import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfilePictureDto } from './dto/create-profile-picture.dto';
import { UpdateProfilePictureDto } from './dto/update-profile-picture.dto';
import { ProfilePictureEntry } from './entities/profile-picture.entity'
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
// import { UsersService } from 'src/users/users.service';
import { UsersService } from './../users/users.service';

@Injectable()
export class ProfilePictureService {
  constructor(
    @InjectRepository(ProfilePictureEntry) 
    private readonly profilePictureRepository: Repository<ProfilePictureEntry>,
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
  ) {}

  async addImageToFreeImage (profilePhoto)  {
    const formData = new FormData(); 
    formData.append('image', profilePhoto);  
    const { data: imageData } = await firstValueFrom(
      this.httpService
        .post(
          `https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5`,
          formData,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log("error!!!!!");
            throw error;
          }),
        ),
    );
    return imageData
  } 

  async saveImage(profilePhoto: string, userId: string) {
    const imageData = await this.addImageToFreeImage(profilePhoto)

    const user = await  this.usersService.findById(Number(userId));
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const profilePictureEntry = new ProfilePictureEntry();
    profilePictureEntry.profilePhoto = imageData.image.display_url;
    profilePictureEntry.user = user;

    // return {
    //   UserId: userId,
    //   ProfilePicture: imageData.image.display_url
    // }

    return await this.profilePictureRepository.save(profilePictureEntry);
  }

  async getProfilePictureByUserId(userId: string): Promise<ProfilePictureEntry> {
    const user = await this.usersService.findById(Number(userId));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profilePicture = await this.profilePictureRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });

    if (!profilePicture) {
      throw new NotFoundException('Profile picture not found');
    }

    return profilePicture;
  }

  async deleteProfilePicture(userId: string): Promise<void> {
    const user = await this.usersService.findById(Number(userId));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profilePicture = await this.profilePictureRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!profilePicture) {
      throw new NotFoundException('Profile picture not found');
    }

    await this.profilePictureRepository.remove(profilePicture);
  }

  async updateProfilePicture(userId: string, newProfilePhoto: string): Promise<any> {
    const user = await this.usersService.findById(Number(userId));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profilePicture = await this.profilePictureRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!profilePicture) {
      throw new NotFoundException('Profile picture not found');
    }

    const imageData = await this.addImageToFreeImage(newProfilePhoto)

    profilePicture.profilePhoto = imageData.image.display_url;

    const test = await this.profilePictureRepository.save(profilePicture);

    console.log("hahhhhhhha", test)

    if(test) {
      return test
    } else {
      return "The endpoint is not working "
    }
  }

  create(profilePhotoEntryDto: CreateProfilePictureDto) {
    console.log("createEntryDto", profilePhotoEntryDto)
    // return this.profilePictureRepository.save(profilePhotoEntryDto)
  }

}
