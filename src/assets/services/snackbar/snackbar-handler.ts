import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) {
  }

  showErrorSnackbar = (msg: string, action: string = '', duration: number = 3000) => {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.verticalPosition = 'top';
    config.panelClass = ['alert-red'];
    this.snackbar.open(msg, action, config);
  }
  showSuccessSnackbar = (msg: string, action: string = '', duration: number = 3000) => {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.verticalPosition = 'top';
    config.panelClass = ['alert-green'];
    this.snackbar.open(msg, action, config);
  }
}

interface TErrorResponse {
  code: number;
  message: string;
  exception: string;
  url: string;
}
