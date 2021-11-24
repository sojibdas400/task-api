import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../enums';

export class FilterTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  search?: string;
}
