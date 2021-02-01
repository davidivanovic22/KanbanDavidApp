import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/assets/services/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginAuthGuard } from 'src/assets/services/auth/login-auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent, canActivate: [LoginAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
