import { User } from './../../../@types/entity/User.d';
import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/@types/entity/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task!: any;
  // @Input() user!: User;
  @Output() edit = new EventEmitter<any>();

  ngOnInit(): void {

  }
  constructor(private dialog: MatDialog) { }



}
