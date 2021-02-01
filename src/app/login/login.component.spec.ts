import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        FlexLayoutModule,
      ],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should innerText be Username', () => {
    // get the name's input and display elements from the DOM
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement[] = hostElement.querySelectorAll('mat-form-field');
    fixture.detectChanges();

    expect(nameInput[0].textContent).toBe('Username');
  });
  it('should innerText be Password', () => {
    // get the name's input and display elements from the DOM
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement[] = hostElement.querySelectorAll('mat-form-field');
    fixture.detectChanges();

    expect(nameInput[1].textContent).toBe('Password');
  });
  it('should have button with text LOGIN', () => {
    const debug = fixture.debugElement;
    const native = debug.nativeElement;
    const buttonElem = native.querySelector('.login-btn');
    expect(buttonElem.textContent).toContain('LOGIN');
  });
});
