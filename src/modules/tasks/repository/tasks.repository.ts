import { EntityRepository, Repository } from 'typeorm';
import { FilterTaskDto } from '../dtos/filter-task.dto';
import { TasksEntity } from '../entities/tasks.entity';

@EntityRepository(TasksEntity)
export class TasksRepository extends Repository<TasksEntity> {

  public async getTasks(filterTaskDto: FilterTaskDto): Promise<TasksEntity[]> {
    const query = this.createQueryBuilder('Task');

    const tasks = await query.getMany();
    return tasks;
  }
}
