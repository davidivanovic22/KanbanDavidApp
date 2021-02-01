import { UserService } from 'src/assets/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList: any[] = [];
  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(): void {
    this.userService.getAll().subscribe(data => {
      this.userList = data;
      console.log(this.userList, 'userList');

    });
  }

  addUser(purpose: string, user: any): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: 'auto',
      maxHeight: '80%',
      data: {
        purpose,
        user
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUser();
      }
    });
  }

  archiveUser(user: any): void {
    user.recordStatus = 0;
    console.log(user);

    this.userService.update(user).subscribe(data => {
      console.log('Ovde');
    });
  }

  enableUser(user: any): void {
    user.recordStatus = 1;
    console.log(user);

    this.userService.update(user).subscribe(data => {
      console.log('Ovde');
    });
  }

}
