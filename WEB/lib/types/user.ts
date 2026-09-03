export type UserDto = {
  id: string;
  profilePhotoPublicId: string;
  userName: string;
  firstName: string;
  lastName: string;
  country: string;
  department: string;
  isActive: boolean;
  email: string;
};

export type CurrentUserMetaDataDto = {
  id: string;
  userName: string;
  isActive: string;
  role: string;
};