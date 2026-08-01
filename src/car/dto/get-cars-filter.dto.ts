import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetCarsFilterDto {
  @ApiPropertyOptional({
    description: 'Free-text search across brand, model, and description.',
    example: 'skyline',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by exact brand name (case-insensitive).',
    example: 'Nissan',
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({
    description: 'Filter by car type.',
    enum: ['CIVIL', 'TRACK', 'RALLY', 'TOUGE'],
    example: 'RALLY',
  })
  @IsOptional()
  @IsString()
  @IsIn(['CIVIL', 'TRACK', 'RALLY', 'TOUGE'])
  carType?: string;

  @ApiPropertyOptional({
    description: 'Filter by production year.',
    example: 1999,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined || value === null || value === ''
      ? undefined
      : parseInt(value, 10),
  )
  @IsInt()
  year?: number;

  @ApiPropertyOptional({
    description: 'Page number for pagination (4 items per page).',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined || value === null || value === ''
      ? undefined
      : parseInt(value, 10),
  )
  @IsInt()
  @Min(1)
  page?: number;
}
