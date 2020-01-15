import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JoinComponent } from './join/join.component';
import { LoginComponent } from './join/login/login.component';
import { ResistrationComponent } from './join/resistration/resistration.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ListComponent } from './Components/list/list.component';
import { CompleteRegistrationComponent } from './Components/complete-registration/complete-registration.component';
import { AddTaskComponent } from './Components/add-task/add-task.component';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
const routes: Routes = [
  {path: 'join', component: JoinComponent, children: [
    {path: 'login', component: LoginComponent},
      {path: 'registration', component: ResistrationComponent}]},
  {path: '', component: ListComponent},
  {path: 'complete-register/:key', component: CompleteRegistrationComponent},
  {path: 'add', component: AddTaskComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    JoinComponent,
    LoginComponent,
    ResistrationComponent,
    ListComponent,
    CompleteRegistrationComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule,
    NgbAlertModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
