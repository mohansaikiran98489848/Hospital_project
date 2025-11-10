export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  token?: string;
  role?: string;
  userName?: string;
  // backend may also return other shapes — capture token only when present
}
