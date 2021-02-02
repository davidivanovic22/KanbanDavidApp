import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/assets/services/project/project.service';
import { StatusService } from 'src/assets/services/status/status.service';
import { UserService } from 'src/assets/services/user/user.service';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {
  userList: any = [];
  statusList: any = [];
  project: any;
  purpose!: string;
  today = new Date();
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
    userList: new FormControl(),
    statusList: new FormControl()
  });
  startDate!: any;
  constructor(public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private statusService: StatusService,
    private projectService: ProjectService) {
    this.purpose = data.purpose;
    this.project = data.project;
  }


  ngOnInit(): void {
    this.getAllUser();
    this.getAllStatus();
    if (this.purpose === 'Edit') {
      this.getProjectById();
      this.getUserList();
      this.getStatusList();
    }
  }

  getAllUser(): void {
    this.userService.getAll().subscribe(data => {
      this.userList = data;
    });
  }

  getAllStatus(): void {
    this.statusService.getAll().subscribe(data => {
      this.statusList = data;
    });
  }

  getProjectById(): void {
    this.projectService.getById(this.project.projectId).subscribe(data => {
      this.form.get('name')?.setValue(data.name);
      this.form.get('description')?.setValue(data.description);
      this.form.get('startDate')?.setValue(data.startDate);
      this.date(data.startDate);
      this.form.get('endDate')?.setValue(data.endDate);
    });
  }

  getUserList(): void {
    this.projectService.getUserList(this.project.projectId).subscribe(data => {
      this.form.get('userList')?.setValue(data);
    });
  }

  getStatusList(): void {
    this.projectService.getStatusList(this.project.projectId).subscribe(data => {
      this.form.get('statusList')?.setValue(data);
    });
  }

  compareUser(user1: any, user2: any): boolean {
    return user1.userId === user2.userId;
  }

  compareStatus(status1: any, status2: any): boolean {
    return status1.statusId === status2.statusId;
  }

  save(): void {
    const form = this.form.value;
    if (this.form.valid) {
      if (this.purpose === 'Add') {
        this.projectService.save(form).subscribe(data => {
          this.close();
        });
      } else {
        form.projectId = this.project.projectId;
        this.projectService.update(form).subscribe(data => {
          this.close();
        });
        const statusList: any[] = this.form.get('statusList')?.value;
        console.log(statusList);

        if (statusList.length > 0) {
          this.projectService.saveStatusList(this.project.projectId, statusList).subscribe(data => {
            this.close();
          });
        }
        const userList: any[] = this.form.get('userList')?.value;
        if (userList.length > 0) {
          this.projectService.saveUserList(this.project.projectId, userList).subscribe(data => {
            this.close();
          });
        }
      }
    }
  }

  date(event: MatDatepickerInputEvent<Date>): void {


    this.startDate = event;
  }

  close(): void {
    this.dialogRef.close(true);
  }

}
