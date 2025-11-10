export interface UserDto {
  userId?: number | null;
  username: string;
  password?: string | null; // often not returned by API
  roleId: number;
  roleName?: string | null;
}
