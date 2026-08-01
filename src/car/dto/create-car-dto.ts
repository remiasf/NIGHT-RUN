import {
	IsEnum,
	IsInt,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
	Max,
	Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum CarType {
	RALLY = 'RALLY',
	CIVIL = 'CIVIL',
	TRACK = 'TRACK',
	TOUGE = 'TOUGE',
}

export class CreateCarDto {
	@ApiProperty({
		description: 'Car manufacturer name.',
		example: 'Nissan',
		required: true,
	})
	@IsString()
	brand!: string;

	@ApiProperty({
		description: 'Car model name.',
		example: 'Skyline GT-R R34',
		required: true,
	})
	@IsString()
	model!: string;

	@ApiProperty({
		description: 'Production year of the car.',
		example: 1999,
		minimum: 1886,
		maximum: 2100,
		required: true,
	})
	@IsInt()
	@Min(1886)
	@Max(2100)
	year!: number;

    @ApiProperty({
		description: 'Car description.',
		example: 'The Nissan Skyline GT-R R34 is the iconic fifth generation of the Japanese supercar, produced by Nissan from January 1999 to August 2002. The car became renowned for its phenomenal handling, racing victories, and technologies that were ahead of their time.',
		required: true,
	})
	@IsString()
	description!: string;

	@ApiProperty({
		description: 'Category of the car.',
		enum: CarType,
		enumName: 'CarType',
		example: CarType.TRACK,
		required: true,
	})
	@IsEnum(CarType)
	carType!: CarType;

	@ApiProperty({
		description: 'Unique URL-friendly identifier for the car.',
		example: 'nissan-skyline-gtr-r34-1999',
		required: true,
	})
	@IsString()
	slug!: string;

	@ApiProperty({
		description: 'Current sale price.',
		example: 45000,
		minimum: 0,
		required: true,
	})
	@IsInt()
	@Min(0)
	price!: number;

	@ApiPropertyOptional({
		description: 'Original price before discount.',
		example: 50000,
		minimum: 0,
		required: false,
	})
	@IsOptional()
	@IsInt()
	@Min(0)
	originalPrice?: number;

	@ApiPropertyOptional({
		description: 'URL to the 3D model asset.',
		example: 'https://cdn.example.com/models/r34.glb',
		required: false,
	})
	@IsOptional()
	@IsUrl()
	modelUrl?: string;

	@ApiPropertyOptional({
		description: 'URL to preview image of the car.',
		example: 'https://srnpiccxpucvujhdcgxw.supabase.co/storage/v1/object/public/car-models/nissan_skyline_r34_gt-r.glb',
		required: false,
	})
	@IsOptional()
	@IsUrl()
	imageUrl?: string;

	@ApiPropertyOptional({
		description: '3D model scale multiplier.',
		example: 1,
		required: false,
	})
	@IsOptional()
	@IsNumber()
	scale?: number;

	@ApiPropertyOptional({
		description: 'Vertical offset of the model in scene.',
		example: 0,
		required: false,
	})
	@IsOptional()
	@IsNumber()
	positionY?: number;

	@ApiPropertyOptional({
		description: 'Initial Y-axis rotation for the model.',
		example: 0,
		required: false,
	})
	@IsOptional()
	@IsNumber()
	rotationY?: number;

	@ApiPropertyOptional({
		description: 'Scene environment preset used in the viewer.',
		example: 'city',
		required: false,
	})
	@IsOptional()
	@IsString()
	environment?: string;

	@ApiPropertyOptional({
		description: 'Engine family or marketing name.',
		example: 'Twin-Turbo Inline-6',
		required: false,
	})
	@IsOptional()
	@IsString()
	engine?: string;

	@ApiProperty({
		description: 'Engine type or configuration.',
		example: 'Inline-6',
		required: true,
	})
	@IsString()
	engineType!: string;

	@ApiPropertyOptional({
		description: 'Engine code identifier.',
		example: 'RB26DETT',
		required: false,
	})
	@IsOptional()
	@IsString()
	engineCode?: string;

	@ApiPropertyOptional({
		description: 'Horsepower output in HP.',
		example: 280,
		minimum: 0,
		required: false,
	})
	@IsOptional()
	@IsInt()
	@Min(0)
	hp?: number;

	@ApiPropertyOptional({
		description: 'Torque output in Nm.',
		example: 353,
		minimum: 0,
		required: false,
	})
	@IsOptional()
	@IsInt()
	@Min(0)
	torque?: number;

	@ApiPropertyOptional({
		description: 'Engine displacement in liters.',
		example: 2.6,
		minimum: 0,
		required: false,
	})
	@IsOptional()
	@IsNumber()
	@Min(0)
	displacement?: number;

	@ApiPropertyOptional({
		description: 'Transmission type.',
		example: 'Manual',
		required: false,
	})
	@IsOptional()
	@IsString()
	transmission?: string;

	@ApiProperty({
		description: 'Drive layout.',
		example: 'AWD',
		required: true,
	})
	@IsString()
	driveType!: string;

	@ApiPropertyOptional({
		description: '0 to 100 km/h time in seconds.',
		example: 5.4,
		minimum: 0,
		required: false,
	})
	@IsOptional()
	@IsNumber()
	@Min(0)
	zeroToHundred?: number;

	@ApiPropertyOptional({
		description: 'Top speed in km/h.',
		example: 250,
		minimum: 0,
		required: false,
	})
	@IsOptional()
	@IsInt()
	@Min(0)
	topSpeed?: number;

	@ApiPropertyOptional({
		description: 'Vehicle weight in kilograms.',
		example: 1540,
		minimum: 0,
		required: false,
	})
	@IsOptional()
	@IsInt()
	@Min(0)
	weight?: number;
}
