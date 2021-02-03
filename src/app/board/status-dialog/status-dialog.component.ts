import { FormGroup, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentService } from 'src/assets/services/comment/comment.service';
import { LabelService } from 'src/assets/services/label/label.service';
import { ProjectService } from 'src/assets/services/project/project.service';
import { TaskService } from 'src/assets/services/task/task.service';
import { StatusService } from 'src/assets/services/status/status.service';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss']
})
export class StatusDialogComponent implements OnInit {
  projectId!: any;
  statusList: any = [];
  statusListParent: any = [];
  form = new FormGroup({
    statusList: new FormControl()
  });
  constructor(
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private statusService: StatusService) {
    this.projectId = data.projectId;
    this.statusListParent = data.statusList;


  }

  ngOnInit(): void {
    this.getAllStatus();
  }

  save(): void {
    const statusList: any[] = this.form.get('statusList')?.value;
    this.statusListParent.forEach((status: any) => {
      statusList.push(status.status);
    });
    if (this.form.valid) {
      this.projectService.saveStatusList(this.projectId.projectId, statusList).subscribe(data => {
        this.close();
      });
    }
  }


  getAllStatus(): void {
    this.statusService.getAllWithoutDuplicate(this.projectId.projectId).subscribe(data => {
      this.statusList = data;
    });
  }

  compareStatus(status1: any, status2: any): boolean {
    return status1.statusId === status2.statusId;
  }

  close(): void {
    this.dialogRef.close(true);
  }

}
