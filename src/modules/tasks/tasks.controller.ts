import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { UserEntity } from '../auth/entities/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TasksEntity } from './entities/tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public async getAllTasks(
    @Query() filterTaskDto: FilterTaskDto,
  ): Promise<TasksEntity[]> {
    return this.tasksService.getAllTasks(filterTaskDto);
  }

  @Post()
  public async createTasks(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TasksEntity> {
    return await this.tasksService.createTask(createTaskDto, user);
  }

  @Get('/:id')
  public async getTaskById(@Param('id') id: string): Promise<TasksEntity> {
    return await this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  public async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  public async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TasksEntity> {
    const { status } = updateTaskDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
