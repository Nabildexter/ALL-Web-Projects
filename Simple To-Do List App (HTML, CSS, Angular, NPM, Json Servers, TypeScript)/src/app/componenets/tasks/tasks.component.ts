import { Component, OnInit } from '@angular/core';
import {Task} from "../../Task";
// import {TASKS} from "../../mock-tasks";

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    
    // Promise/Subscribe
    // this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);

    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));

  }

  // Delete Task Save
  deleteTask(task: Task) {

    this.taskService.deleteTask(task).subscribe(() => (this.tasks = this.tasks.filter(t => t.id !== task.id)));


  }

  // Update Task Save
  toggleReminder(task: Task) {

    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();



  }

  // Add new task
  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task => this.tasks.push(task)));
  }

}
