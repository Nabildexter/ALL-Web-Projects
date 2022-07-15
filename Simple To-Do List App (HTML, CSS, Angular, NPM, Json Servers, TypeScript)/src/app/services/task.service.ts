import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

//Http client
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Task} from "../Task";
// import {TASKS} from "../mock-tasks";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // API URL (db json)  
  private APIurl = "http://localhost:5000/tasks";

  // to use CRUD functionality
  constructor(private http:HttpClient) { }

  // Get
  getTasks(): Observable<Task[]> {
    
    // const tasks = of(TASKS);
    // return tasks;

    return this.http.get<Task[]>(this.APIurl);
  }


  // Delete Task Super
  deleteTask(task: Task): Observable<Task> {


    const url = `${this.APIurl}/${task.id}`;

    return this.http.delete<Task>(url);

  }


  //Update Task Super
  updateTaskReminder(task: Task): Observable<Task> {


    const url = `${this.APIurl}/${task.id}`;

    return this.http.put<Task>(url, task, httpOptions);

  }


    //Add Task Super
    addTask(task: Task): Observable<Task> {

  
      return this.http.post<Task>(this.APIurl, task, httpOptions);
    }
}
