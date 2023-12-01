import { Injectable } from '@nestjs/common';
import { TASK_STATUS, Task } from './task.model';
import * as uuid from 'uuid';
import { createTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAlltasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(input: createTaskDto): Task {
    const { title } = input;

    const task: Task = {
      id: uuid.v1(),
      title,
      status: TASK_STATUS.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, status: TASK_STATUS) {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
