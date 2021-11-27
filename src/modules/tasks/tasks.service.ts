import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './enums';
import { TasksRepository } from './repository/tasks.repository';
import { TasksEntity } from '../tasks/entities/tasks.entity';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { UserEntity } from '../auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  public async getAllTasks(
    filterTaskDto: FilterTaskDto,
  ): Promise<TasksEntity[]> {
    return this.taskRepository.getTasks(filterTaskDto);
  }

  public async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TasksEntity> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  public async getTaskById(id: string): Promise<TasksEntity> {
    return this.taskRepository.getTaskById(id);
  }

  public async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    console.log(result);
  }

  public async updateTaskStatus(
    id: string,
    status: TaskStatus,
  ): Promise<TasksEntity> {
    return this.taskRepository.updateTaskStatus(id, status);
  }
}
