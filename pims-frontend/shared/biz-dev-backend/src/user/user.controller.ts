import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async create(
    @Body() dto: { userId: string; empNo: string; password: string },
  ) {
    return this.userService.signUp(dto);
  }

  @Post('/sign-in')
  async signIn(
    @Body() dto: { userId: string; empNo: string; password: string },
  ) {
    return this.userService.signIn(dto);
  }
}
