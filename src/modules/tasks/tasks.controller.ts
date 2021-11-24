import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  public async createTasks(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  public async getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  public async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  public async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const { status } = updateTaskDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
