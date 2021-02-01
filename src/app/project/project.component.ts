import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from 'src/assets/services/project/project.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'actions'];
  dataSource = new MatTableDataSource([]);
  projectList: any = [];
  constructor(private dialog: MatDialog, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getAllProject();
  }


  getAllProject(): void {
    this.projectService.getAll().subscribe(data => {
      this.projectList = data;
      this.dataSource.data = this.projectList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addProject(purpose: string, project: any): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '270px',
      data: {
        purpose,
        project
      }
    });
    dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.getAllProject();
        }
      }
      );
  }

}
