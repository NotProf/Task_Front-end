import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-resistration',
  templateUrl: './resistration.component.html',
  styleUrls: ['./resistration.component.css']
})
export class ResistrationComponent implements OnInit {
  checkpass = '';
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    const user: User = form.value;
    console.log(user);
    this.userService.registration(user).subscribe((res) => {
      console.log(res);
    });
  }

  checkPassword(form: NgForm) {
    if(form.value.password === form.value.confirmp)
      this.checkpass = '';
    else this.checkpass = 'Паролі не співпадають';
  }
}
}
