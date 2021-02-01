import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { Status } from './../../@types/entity/Status.d';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoggedInUserService } from 'src/assets/services/logged-in-user/logged-in-user.service';
import { ProjectService } from 'src/assets/services/project/project.service';
import { StatusService } from 'src/assets/services/status/status.service';
import { UserService } from 'src/assets/services/user/user.service';
import { TaskDialogComponent } from './task/task-dialog/task-dialog.component';
import { Task } from 'src/@types/entity/Task';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { filterTask } from 'src/assets/utils/filter';
interface StatusTaskDTO {
  status: Status;
  taskList: Task[];
}



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  constructor(private dialog: MatDialog, private userService: UserService,
              private loggedInUserService: LoggedInUserService,
              private projectService: ProjectService,
              private statusService: StatusService) {


  }

  connectedTo: any = [];
  statusList: any = [];
  statusFiltered: any = [];
  loggedInUser: any = [];
  projectList: any = [];
  projectId!: any;
  userList: any = [];
  userFilteredList: any = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ngOnInit(): void {
    console.log(this.statusList.length);

    this.getLoggedInUser().then(data => {
      if (data) {
        this.loggedInUser = data;
        console.log(this.loggedInUser, 'LoggedInUser');
        this.getProjectList();
      }
    });
  }

  getLoggedInUser(): Promise<any> {
    return this.loggedInUserService.getLoggedInUser().toPromise();
  }

  getUserList(): void {
    this.projectService.getUserList(this.projectId.projectId).subscribe(data => {
      this.userList = data;
    });
  }

  getProjectList(): void {
    this.userService.getProjectListByUserId(this.loggedInUser.userId).subscribe(data => {
      this.projectList = data;
      console.log(this.projectList, 'Projekti');
    });
  }

  getProjectStatusTaskDTO(projectId: any): void {
    this.projectId = projectId;
    this.projectService.getProjectStatusTaskDTO(projectId.projectId).subscribe(data => {
      console.log(data);
      this.statusList = data.statusTaskDTOList;
      this.statusFiltered = data.statusTaskDTOList;
      for (const status of this.statusList) {
        this.connectedTo.push(status.status.statusId.toString());
      }

      this.getUserList();
    });
  }


  newTask(statusId: any, purpose: string): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        statusId,
        projectId: this.projectId,
        purpose
      }
    });
    dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.getProjectStatusTaskDTO(this.projectId);
        }
      }
      );
  }

  editTask(task: Task, purpose: string): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '30%',
      maxHeight: '80%',
      data: {
        task,
        enableDelete: true,
        purpose,
        user: this.loggedInUser
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProjectStatusTaskDTO(this.projectId);
      }
    });
  }

  addColumn(): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '30%',
      maxHeight: '80%',
      data: {
        projectId: this.projectId,
        statusList: this.statusList
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProjectStatusTaskDTO(this.projectId);
      }

    });
  }

  removeColumn(status: any, haveTasks: boolean): void {
    console.log(haveTasks, 'TacnoILiNe');
    if (!haveTasks) {
      this.projectService.deleteStatusFromListByProjectId(this.projectId.projectId, status.statusId).subscribe(data => {
        this.getProjectStatusTaskDTO(this.projectId);
      });
    }
  }


  drop(event: CdkDragDrop<any[]>): void {
    let statusId: number;
    let status: any;
    let taskList: any;
    let statusTaskDTO: StatusTaskDTO;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    console.log(event, 'Task');
    // console.log(event.container.id);
    statusId = +event.container.id;
    taskList = event.container.data;
    this.statusService.getById(statusId).subscribe(data => {
      status = data;
      statusTaskDTO = {
        status,
        taskList
      };
      console.log(statusTaskDTO);

      this.statusService.saveStatusTaskDTO(statusTaskDTO).subscribe(res => {
        console.log(res);

      });
    });
  }

  addUserSearch(user: any): void {
    if (!this.userFilteredList.includes(user)) {
      this.userFilteredList.push(user);
      this.getFilteredProjectStatusTaskDTO();
    }
  }

  getFilteredProjectStatusTaskDTO(): void {
    this.projectService.getFilteredProjectStatusTaskDTO(this.projectId.projectId, this.userFilteredList).subscribe(data => {
      this.statusList = data.statusTaskDTOList;
    });
  }

  remove(user: any): void {
    const index = this.userFilteredList.indexOf(user);
    if (index >= 0) {
      this.userFilteredList.splice(index, 1);
      if (this.userFilteredList.length > 0) {
        this.getFilteredProjectStatusTaskDTO();
      } else {
        this.getProjectStatusTaskDTO(this.projectId);
      }

    }
  }
}
