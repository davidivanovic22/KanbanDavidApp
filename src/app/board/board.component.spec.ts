import { MaterialModule } from './../material.module';
import { HttpClientModule } from '@angular/common/http';
import { StatusService } from './../../assets/services/status/status.service';
import { ProjectService } from './../../assets/services/project/project.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoggedInUserService } from 'src/assets/services/logged-in-user/logged-in-user.service';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [HttpClientModule, MaterialModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }, {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
