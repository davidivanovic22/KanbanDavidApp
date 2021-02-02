import { TaskService } from './../../../../assets/services/task/task.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelService } from './../../../../assets/services/label/label.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentService } from 'src/assets/services/comment/comment.service';
import { ProjectService } from 'src/assets/services/project/project.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  userList: any[] = [];
  labelList: any[] = [];
  commentList: any = [];
  startDate: Date;
  endDate: Date;
  form = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    dueDate: new FormControl(),
    labelList: new FormControl(),
    userList: new FormControl(),
  });
  formComment = new FormGroup({
    commentText: new FormControl(null, Validators.required)
  });
  constructor(private dialog: MatDialog,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentService: CommentService,
    private labelService: LabelService,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {


    if (data.purpose === 'Edit') {
      this.form.get('name')?.setValue(data.task.name);
      this.form.get('description')?.setValue(data.task.description);
      this.form.get('dueDate')?.setValue(data.task.dueDate);
      this.form.get('labelList')?.setValue(data.task.labelList);
      this.form.get('userList')?.setValue(data.task.userList);
      this.startDate = data.task.projectId.startDate;
      this.endDate = data.task.projectId.endDate;
    } else {
      this.startDate = data.projectId.startDate;
      this.endDate = data.projectId.endDate;
    }

  }
  ngOnInit(): void {
    if (this.data.purpose === 'Edit') {

      this.getAllCommentByTaskId();
    }
    this.getAllLabel();
    this.getUserList();
  }

  getAllLabel(): void {
    this.labelService.getAll().subscribe(data => {
      this.labelList = data;
    });
  }

  getUserList(): void {
    let projectId!: number;
    if (this.data.purpose === 'Add') {
      projectId = this.data.projectId.projectId;
    } else if (this.data.purpose === 'Edit') {
      projectId = this.data.task.projectId.projectId;
    }
    this.projectService.getUserList(projectId).subscribe(data => {

      this.userList = data;
    });
  }

  getAllCommentByTaskId(): void {
    this.commentService.getAllCommentByTaskId(this.data.task.taskId).subscribe(data => {
      if (data) {
        this.commentList = data;

      }
    });
  }

  save(): void {
    if (this.data.purpose === 'Add') {
      const form = this.form.value;
      form.projectId = this.data.projectId;
      form.statusId = this.data.statusId;

      this.taskService.save(form).subscribe(data => {
        this.close();
      });
    } else {
      const form = this.form.value;

      form.taskId = this.data.task.taskId;
      form.projectId = this.data.task.projectId;
      form.statusId = this.data.task.statusId;

      this.taskService.save(form).subscribe(data => {
        this.close();
      });
    }

  }
  close(): void {
    this.dialogRef.close(true);
  }

  compareUser(user1: any, user2: any): boolean {
    return user1.userId === user2.userId;
  }

  compareLabel(label1: any, label2: any): boolean {
    return label1.labelId === label2.labelId;
  }

  deleteTask(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you want delete?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.delete(this.data.task.taskId).subscribe(data => {
          this.close();
        });
      }
    });
  }

  share(): void {
    const form = this.formComment.value;
    form.taskId = this.data.task;
    form.userId = this.data.user;


    this.commentService.save(form).subscribe(data => {
      this.getAllCommentByTaskId();
      this.formComment.reset();
    });
  }
}
