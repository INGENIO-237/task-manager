import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { TASK_STATUS } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAlltasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string){
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@Body() task: createTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch("/:id/status")
  updateTaskStatus(@Param("id") id: string, @Body("status") status: TASK_STATUS){
    return this.tasksService.updateTaskStatus(id, status)
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string){
    this.tasksService.deleteTask(id)
  }
}
