export interface IAdminProfile {
  fullName: string;
  email: string;
  avatar?: string;
}

export interface IGetProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IAdminProfile;
}
