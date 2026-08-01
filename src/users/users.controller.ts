import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Post('sync')
  @UseGuards(FirebaseAuthGuard)
  async syncUser(@Req() req: any) {
    const { uid, email, name } = req.user;

    const user = await this.prisma.user.upsert({
      where: { firebaseUid: uid },
      update: { email: email },
      create: {
        firebaseUid: uid,
        email: email,
        login: name || email.split('@')[0],
      },
    });

    return user;
  }
}