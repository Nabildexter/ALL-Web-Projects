import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Import font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import http
import {HttpClientModule} from '@angular/common/http'

// Import forms module
import {FormsModule} from '@angular/forms';

// Import Router if chosen yes
import { Router, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componenets/header/header.component';
import { ButtonComponent } from './componenets/button/button.component';
import { TasksComponent } from './componenets/tasks/tasks.component';
import { TaskItemComponent } from './componenets/task-item/task-item.component';
import { AddTaskComponent } from './componenets/add-task/add-task.component';
import { AboutComponent } from './componenets/about/about.component';
import { FooterComponent } from './componenets/footer/footer.component';

// All routes
const appRoutes: Routes = [
  {path: '', component: TasksComponent},
  {path: 'about', component: AboutComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TasksComponent,
    TaskItemComponent,
    AddTaskComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
