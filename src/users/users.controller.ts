import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll(@Query('role') role?: 'intern' | 'engineer' | 'tester' | 'admin') {
    return this.userService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id); //Unary plus
  }

  @Post()
  createUser(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'intern' | 'engineer' | 'tester' | 'admin';
    },
  ) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body()
    updateUser: {
      name?: string;
      email?: string;
      role?: 'intern' | 'engineer' | 'tester' | 'admin';
    },
  ) {
    return this.userService.updateUser(+id, updateUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
