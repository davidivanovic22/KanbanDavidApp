import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/assets/services/auth/authentication.service';
import { LoggedInUserService } from 'src/assets/services/logged-in-user/logged-in-user.service';
import { UserService } from 'src/assets/services/user/user.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthenticationService,
    private loggedInUserService: LoggedInUserService,
    private userService: UserService) { }
  loggedInUser: any;
  projectList: any = [];



  form = new FormGroup({
    name: new FormControl(),
    email: new FormControl()
  });

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.projectList, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.getLoggedInUser().then(data => {
      if (data) {
        this.loggedInUser = data;
        console.log(this.loggedInUser, 'LoggedInUser');
        this.getProjectList();
      }
    });
  }

  getProjectList(): void {
    this.userService.getProjectListByUserId(this.loggedInUser.userId).subscribe(data => {
      this.projectList = data;
      console.log(this.projectList, 'Projekti');
    });
  }


  getLoggedInUser(): Promise<any> {
    return this.loggedInUserService.getLoggedInUser().toPromise();
  }


}
