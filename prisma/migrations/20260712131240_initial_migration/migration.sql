-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "originalPrice" INTEGER,
    "modelUrl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "scale" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "positionY" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "rotationY" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "environment" TEXT NOT NULL DEFAULT 'city',
    "engine" TEXT,
    "engineType" TEXT NOT NULL,
    "engineCode" TEXT,
    "hp" INTEGER,
    "torque" INTEGER,
    "displacement" DOUBLE PRECISION,
    "transmission" TEXT,
    "driveType" TEXT NOT NULL,
    "zeroToHundred" DOUBLE PRECISION,
    "topSpeed" INTEGER,
    "weight" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Car_slug_key" ON "Car"("slug");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
