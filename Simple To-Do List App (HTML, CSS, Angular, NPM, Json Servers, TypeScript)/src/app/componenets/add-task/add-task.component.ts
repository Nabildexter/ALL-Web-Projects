import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Task} from "../../Task";

// Bring in UI Service here
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  text!: string;
  day!: string;
  reminder: boolean = false;

  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {

    this.subscription = this.uiService.onToggle().subscribe((res) => this.showAddTask = res);

   }

  ngOnInit(): void {
  }

  onSubmit(){



    if(!this.text){
      alert("Please add a task");
      return;
    }
    if(!this.day){
      alert("Please add a date and time");
      return;
    }

    // Create new task object
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }


    // Add task
    this.onAddTask.emit(newTask);

    // Reset
    this.text = "";
    this.day = "";
    this.reminder = false;
    


  }

}
