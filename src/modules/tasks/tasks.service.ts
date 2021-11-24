import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './enums';
import { TasksRepository } from './repository/tasks.repository';
import { TasksEntity } from '../tasks/entities/tasks.entity';
import { FilterTaskDto } from './dtos/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  public async getAllTasks(filterTaskDto: FilterTaskDto): Promise<TasksEntity[]> {
    return this.taskRepository.getTasks(filterTaskDto);
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<TasksEntity> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }

  public async getTaskById(id: string): Promise<TasksEntity> {
    const found = await this.taskRepository.findOne(id);
    if (!found) throw new NotFoundException(`Task with id "${id}" not found`);
    return found;
  }

  public async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    console.log(result);
  }

  public async updateTaskStatus(
    id: string,
    status: TaskStatus,
  ): Promise<TasksEntity> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
