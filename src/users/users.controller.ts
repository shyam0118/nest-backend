import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
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
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateUser: {
      name?: string;
      email?: string;
      role?: 'intern' | 'engineer' | 'tester' | 'admin';
    },
  ) {
    return this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
