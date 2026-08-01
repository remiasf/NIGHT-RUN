/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `carType` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('RALLY', 'CIVIL', 'TRACK');

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "carType" "CarType" NOT NULL,
ALTER COLUMN "modelUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "login" TEXT NOT NULL;
