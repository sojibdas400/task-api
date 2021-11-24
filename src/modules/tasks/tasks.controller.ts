import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
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
  public async getTaskById(@Param('id') id:string) {
    return this.tasksService.getTaskById(id);
  }
}
