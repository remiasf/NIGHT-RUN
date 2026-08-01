import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth/firebase-auth.guard';

@Module({
	controllers: [UsersController],
	providers: [PrismaService, FirebaseService, FirebaseAuthGuard],
})
export class UsersModule {}
