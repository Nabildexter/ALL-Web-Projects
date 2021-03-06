import { Component, OnInit } from '@angular/core';

// Bring in UI service
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = 'Task Tracker To-do List';
  showAddTask: boolean = false;
  subscription!: Subscription;



  constructor(private uiService: UiService, private router:Router) {

    this.subscription = this.uiService.onToggle().subscribe((res) => this.showAddTask = res);
    
   }

  ngOnInit(): void {
  }

  toggleAddingTask(){
    this.uiService.toggleAddTask();
  }

  hasRouteProperty(route:string) {
    return this.router.url === route;
  }
}
