import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'arjun',
      email: 'arjun@gmail.com',
      role: 'engineer',
    },
    {
      id: 2,
      name: 'rohit',
      email: 'rohit@gmail.com',
      role: 'tester',
    },
    {
      id: 3,
      name: 'sara',
      email: 'sara@gmail.com',
      role: 'intern',
    },
    {
      id: 4,
      name: 'shyam',
      email: 'shyam@gmail.com',
      role: 'admin',
    },
    {
      id: 5,
      name: 'kiran',
      email: 'kiran@gmail.com',
      role: 'engineer',
    },
  ];

  findAll(role?: 'intern' | 'engineer' | 'tester' | 'admin') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0)
        throw new NotFoundException('User role found');

      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  createUser(user: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updateUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  deleteUser(id: number) {
    const deleteUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return deleteUser;
  }
}
