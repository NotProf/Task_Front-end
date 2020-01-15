import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Task} from '../../Models/Task';
import {TaskService} from '../../Services/task.service';

import {UserService} from '../../Services/user.service';
import {User} from '../../Models/User';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task = new Task();
  listUsers: User[] = [];
  userForShare: User[] = [];
  closeResult: string;
  constructor(private modalService: NgbModal,
              private taskService: TaskService,
              private userService: UserService,
              private router: Router,
              private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.taskService.getTasks().subscribe((res) => {
      this.tasks = res;
    }, error => console.log('Not Authentication'));
    this.userService.getUsers().subscribe((res) => {
      this.listUsers = res;
      this.removeCurrent();
    }, error => console.log('Not Authentication'));
  }
  open(content) {
    if (this.userService.authorization) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {this.router.navigateByUrl('/join/login'); }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  save(form) {
    const task = new Task();
    const d = form.value.date;
    const date = new Date(d);
    task.text = form.value.text;
    task.date = date;
    console.log(task);
    this.taskService.addTask(task).subscribe((res) => {
       const newTask: Task = res;
       console.log(newTask);
       this.tasks.push(newTask);
       this.modalService.dismissAll();
    });
  }

  remove(id: number) {
    const conf = confirm('Remove this Task?');
    if (conf) {
      this.taskService.removeTask(id).subscribe((res) => {
        this.tasks = res;
      });
    }
  }


  details(task: Task, detail) {
    this.open(detail);
    this.selectedTask = task;
  }

  update() {
    this.taskService.updateTask(this.selectedTask).subscribe((res) => {
      console.log(res);
      this.modalService.dismissAll();
      this.ngOnInit();
    });
  }

  shareTask(user: User) {
   const conf = confirm('Share this task with ' + user.username + '?');
   this.spinner.show();
   if (conf) {
     this.taskService.shareTask(this.selectedTask.id, user.id).subscribe((res) => {
       if (res) {
         this.ngOnInit();
         this.spinner.hide();
         alert('Success');
       }
     }, error => {
       console.log(error);
       this.spinner.hide();
       alert('Error');
     });
   }
  }
  removeCurrent() {
   const name = localStorage.getItem('CurrentUser');
   this.listUsers = this.listUsers.filter(user => user.username !== name);
  }
}
