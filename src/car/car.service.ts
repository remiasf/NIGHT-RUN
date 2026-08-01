import { BadRequestException, Injectable } from '@nestjs/common';
import { Car, CarType as PrismaCarType, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car-dto';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';

export type CarListItem = Prisma.CarGetPayload<{
	select: {
		brand: true;
		year: true;
		hp: true;
		torque: true;
	};
}>;

export type CarLiveSearchItem = Prisma.CarGetPayload<{
	select: {
		id: true;
		brand: true;
		model: true;
		year: true;
	};
}>;

export type CarListMeta = {
	totalPages: number;
	total: number;
	page: number;
	limit: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
};

export type CarListResponse = {
	data: CarListItem[];
	meta: CarListMeta;
};

@Injectable()
export class CarService {
	constructor(private readonly prisma: PrismaService) {}

	async createForUser(userId: string, createCarDto: CreateCarDto) {
		return this.prisma.car.create({
			data: {
				brand: createCarDto.brand,
				model: createCarDto.model,
				year: createCarDto.year,
                description: createCarDto.description,
				carType: createCarDto.carType,
				slug: createCarDto.slug,
				price: createCarDto.price,
				originalPrice: createCarDto.originalPrice,
				modelUrl: createCarDto.modelUrl,
				imageUrl: createCarDto.imageUrl,
				scale: createCarDto.scale,
				positionY: createCarDto.positionY,
				rotationY: createCarDto.rotationY,
				environment: createCarDto.environment,
				engine: createCarDto.engine,
				engineType: createCarDto.engineType,
				engineCode: createCarDto.engineCode,
				hp: createCarDto.hp,
				torque: createCarDto.torque,
				displacement: createCarDto.displacement,
				transmission: createCarDto.transmission,
				driveType: createCarDto.driveType,
				zeroToHundred: createCarDto.zeroToHundred,
				topSpeed: createCarDto.topSpeed,
				weight: createCarDto.weight,
				user: {
					connect: { id: userId },
				},
			},
		});
	}
	
	async findOne(id: string) {
		const car = await this.prisma.car.findUnique({
			where: { id },
		});

		if (!car) {
			throw new BadRequestException('Wrong car id provided');
		}

		return car;
	}

	async findAll(filters: GetCarsFilterDto): Promise<CarListResponse> {
		const where: Prisma.CarWhereInput = {};
		const page = filters.page ?? 1;
		const limit = 4;
		const skip = (page - 1) * limit;

		if (filters.carType) {
			const normalizedCarType = filters.carType.toUpperCase();
			const carTypeMap: Record<string, PrismaCarType> = {
				CIVIL: PrismaCarType.CIVIL,
				TRACK: PrismaCarType.TRACK,
				RALLY: PrismaCarType.RALLY,
				TOUGE: PrismaCarType.TOUGE,
			};

			if (carTypeMap[normalizedCarType]) {
				where.carType = carTypeMap[normalizedCarType];
			}
		}

		if (filters.brand) {
			where.brand = {
				equals: filters.brand,
				mode: 'insensitive',
			};
		}

		if (typeof filters.year === 'number' && Number.isInteger(filters.year)) {
			where.year = filters.year;
		}

		if (filters.search?.trim()) {
			const search = filters.search.trim();
			where.OR = [
				{ brand: { contains: search, mode: 'insensitive' } },
				{ model: { contains: search, mode: 'insensitive' } },
				{ description: { contains: search, mode: 'insensitive' } },
			];
		}

		const [total, data] = await this.prisma.$transaction([
			this.prisma.car.count({ where }),
			this.prisma.car.findMany({
				where,
				orderBy: { year: 'desc' },
				take: limit,
				skip,
				select: {
					id: true,
					brand: true,
					model: true,
					year: true,
					hp: true,
					torque: true,
					modelUrl: true,
					engine: true,
					displacement: true,
					weight: true,
					topSpeed: true,
				},
			}),
		]);

		const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

		return {
			data,
			meta: {
				totalPages,
				total,
				page,
				limit,
				hasNextPage: page < totalPages,
				hasPreviousPage: page > 1,
			},
		};
	}

	async findAllByUser(userId: string): Promise<Car[]> {
		return this.prisma.car.findMany({
			where: { userId },
			orderBy: { year: 'desc' },
		});
	}

	async liveSearch(query: string): Promise<CarLiveSearchItem[]> {
		const search = query?.trim() ?? '';
		if (!search) {
			return [];
		}

		const pattern = `%${search}%`;

		return this.prisma.$queryRaw<CarLiveSearchItem[]>`
			SELECT id, brand, model, year
			FROM "Car"
			WHERE
				brand ILIKE ${pattern}
				OR model ILIKE ${pattern}
				OR CAST(year AS TEXT) LIKE ${pattern}
			ORDER BY year DESC
			LIMIT 15
		`;
	}
}
