import { NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/modules/auth/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { FilterTaskDto } from '../dtos/filter-task.dto';
import { TasksEntity } from '../entities/tasks.entity';
import { TaskStatus } from '../enums';

@EntityRepository(TasksEntity)
export class TasksRepository extends Repository<TasksEntity> {
  public async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TasksEntity> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }

  public async getTasks(filterTaskDto: FilterTaskDto): Promise<TasksEntity[]> {
    const query = this.createQueryBuilder('Task');

    const tasks = await query.getMany();
    return tasks;
  }

  public async getTaskById(id: string): Promise<TasksEntity> {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException(`Task with id "${id}" not found`);
    return found;
  }

  public async updateTaskStatus(
    id: string,
    status: TaskStatus,
  ): Promise<TasksEntity> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.save(task);
    return task;
  }
}
