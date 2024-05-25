export class CreateProfilePictureDto {
    ProfilePicture: string;
    UserId: string;

    constructor(ProfilePicture?: any, UserId?: string){
        this.ProfilePicture = ProfilePicture;
        this.UserId = UserId
    } 
}
