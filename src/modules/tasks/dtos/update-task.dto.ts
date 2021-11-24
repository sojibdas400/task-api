import { IsEnum } from 'class-validator';
import { TaskStatus } from '../enums';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
