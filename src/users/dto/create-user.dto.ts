import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['admin', 'engineer', 'intern', 'tester'], {
    message: 'Valid role required',
  })
  role: 'admin' | 'engineer' | 'intern' | 'tester';
}
