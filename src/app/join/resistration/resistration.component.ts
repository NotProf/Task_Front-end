import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../Models/User';
import {UserService} from '../../Services/user.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-resistration',
  templateUrl: './resistration.component.html',
  styleUrls: ['./resistration.component.css']
})
export class ResistrationComponent implements OnInit {
  message = '';

  constructor(private userService: UserService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
  }

  register(form: NgForm) {
    this.spinner.show();
    const user: User = form.value;
    this.userService.checkUsername(user.username).subscribe((check) => {
       if (check) {
         this.userService.registration(user).subscribe((res) => {
           console.log(res);
           if (res) {
             this.message = 'Your account has been created. Check your email';
           }
           this.spinner.hide();
         }, error => {
           this.message = 'Error, Try again';
           this.spinner.hide();
           console.error(error);
         });
       } else {
         this.message = 'Username already exist';
         this.spinner.hide();
       }
    }, error => {
      this.message = 'Error!';
      this.spinner.hide();
      console.error(error);
    });
  }
}
