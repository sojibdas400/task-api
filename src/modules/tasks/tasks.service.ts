import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  private tasks = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task = {
      id: (Math.random() * 100).toFixed(0).toString(),
      title,
      description,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id) {
    return this.tasks.find((task) => task.id === id);
  }
}
