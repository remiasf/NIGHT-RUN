import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
	CarListResponse,
	CarLiveSearchItem,
	CarService,
} from './car.service';
import { CreateCarDto } from './dto/create-car-dto';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';

@ApiTags('car')
@Controller('car')
export class CarController {
	constructor(private readonly carService: CarService) {}

	@Get()
	@ApiOperation({ summary: 'Get cars with optional search and filters' })
	@ApiQuery({
		name: 'search',
		required: false,
		type: String,
		description: 'Partial text search across brand, model, and description',
		example: 'gt-r',
	})
	@ApiQuery({
		name: 'brand',
		required: false,
		type: String,
		description: 'Exact brand match, case-insensitive',
		example: 'Nissan',
	})
	@ApiQuery({
		name: 'carType',
		required: false,
		enum: ['CIVIL', 'TRACK', 'RALLY', 'TOUGE'],
		description: 'Car category',
		example: 'RALLY',
	})
	@ApiQuery({
		name: 'year',
		required: false,
		type: Number,
		description: 'Exact production year',
		example: 1999,
	})
	@ApiQuery({
		name: 'page',
		required: false,
		type: Number,
		description: 'Page number for pagination (4 items per page)',
		example: 1,
	})
	findAll(@Query() filters: GetCarsFilterDto): Promise<CarListResponse> {
		return this.carService.findAll(filters);
	}

	@Get('search/live')
	@ApiOperation({
		summary: 'Live search cars by brand, model, or year (max 15 results)',
	})
	@ApiQuery({
		name: 'q',
		required: true,
		type: String,
		description: 'Search string matched against brand, model, and year',
		example: 'skyline',
	})
	liveSearch(@Query('q') q: string): Promise<CarLiveSearchItem[]> {
		return this.carService.liveSearch(q ?? '');
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.carService.findOne(id);
	}

	@Post('user/:userId')
	createForUser(
		@Param('userId') userId: string,
		@Body() createCarDto: CreateCarDto,
	) {
		return this.carService.createForUser(userId, createCarDto);
	}

	@Get('user/:userId')
	findAllByUser(@Param('userId') userId: string) {
		return this.carService.findAllByUser(userId);
	}
}
