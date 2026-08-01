import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CarController],
  providers: [CarService, PrismaService],
})
export class CarModule {}
