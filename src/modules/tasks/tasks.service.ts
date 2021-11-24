import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './enums';

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
    const task = this.tasks.find((task) => task.id === id);

    if (!task) throw new NotFoundException();
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id === id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
