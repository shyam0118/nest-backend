import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  createUser(user: {
    name: string;
    email: string;
    role: 'intern' | 'engineer' | 'tester' | 'admin';
  }) {
    const userByHighestId = [...this.users].sort((a, b) => (b.id - a.id));

    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(
    id: number,
    updateUser: {
      name?: string;
      email?: string;
      role?: 'intern' | 'engineer' | 'tester' | 'admin';
    },
  ) {
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
