import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/assets/services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('.3s', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('.3s', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'KanbanDavidApp';
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  menuItems: any[] = [];
  opened = false;
  activeRoute!: string;

  constructor(private authService: AuthenticationService) {
  }

  ngDoCheck(): void {
    if (window.location.pathname === '/') {
      this.opened = false;
    } else {
      this.opened = true;
    }
    this.setMenuItem();
  }

  ngOnInit(): void {
  }

  setMenuItem(): void {
    if (this.authService.isLoggedIn) {
      this.activeRoute = window.location.pathname;
      if (this.authService.isAdmin()) {
        this.menuItems = [{ title: 'Home', icon: 'home_work', path: '/home' },
        { title: 'User', icon: 'face', path: '/user' },
        { title: 'Project', icon: 'receipt_long', path: '/project' },
        { title: 'Board', icon: 'dashboard', path: '/board' },
        ];
      } else if (this.authService.isDeveloper()) {
        this.menuItems = [{ title: 'Home', icon: 'home_work', path: '/home' },
        { title: 'Board', icon: 'dashboard', path: '/board' }];
      }
    }
  }

  onResize(event: any): void {
    if (event.target.innerWidth < 600) {
      this.opened = false;
    } else {
      this.opened = true;
    }

  }

  changeRoute(): void {


    this.activeRoute = window.location.pathname;
  }
  logout(): void {
    this.authService.logout();
  }
}
