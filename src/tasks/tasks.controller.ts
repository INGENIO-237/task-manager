import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAlltasks();
  }

  @Post()
  createTask(@Body() task: createTaskDto) {
    return this.tasksService.createTask(task);
  }
}
