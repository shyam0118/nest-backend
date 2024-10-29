import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Prisma } from '@prisma/client';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() createMemberDto: Prisma.MemberCreateInput) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  findAll(@Query('role') role?: 'intern' | 'engineer' | 'tester' | 'admin') {
    return this.membersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: Prisma.MemberUpdateInput) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
