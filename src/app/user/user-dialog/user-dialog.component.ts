import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/assets/services/project/project.service';
import { RoleService } from 'src/assets/services/role/role.service';
import { UserService } from 'src/assets/services/user/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  projectList: any = [];
  roleList: any = [];
  user: any;
  purpose!: string;
  photoList: any = [
    'https://www.shareicon.net/data/512x512/2016/07/07/116152_avatar_512x512.png',
    'https://cdn4.iconfinder.com/data/icons/people-avatars-12/24/people_avatar_head_captain_america_marvel_hero-512.png',
    'https://i.pinimg.com/originals/60/7b/a1/607ba1795c55444e38bed385a9272932.png',
    'https://uploads-ssl.webflow.com/5be3599aab1c261ff27b7a93/5bfc4fa150573c46f050feec_0f604fd139d992450b7c022a12775599.png',
    'https://i.pinimg.com/originals/56/cf/df/56cfdfcc3bc91f2f2ea7de8895e57706.png',
    'https://synth.agency/wp-content/uploads/2019/07/dc-superman-1024x819.png',
    'https://cdn4.iconfinder.com/data/icons/heroes-villains-vol-1-colored/100/Deadpool-512.png',
    'https://i.pinimg.com/originals/00/bf/e1/00bfe1b5690bdb15794ef9175c107bc8.png',
    'https://speckyboy.com/wp-content/uploads/2013/10/flat_heros_17.png',
    'https://cdn.thedesigninspiration.com/wp-content/uploads/2014/01/Flat-Design-Heroes-007.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/db780138650505.598fa11956761.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/fd44d538650505.598fa11957245.jpg',
    'https://i.pinimg.com/originals/cc/35/13/cc35139a1e84ce860f2c627e1d6c232c.png',
    'https://i.pinimg.com/736x/5b/71/ab/5b71ab4ea082c3c11e77312a64bba835.jpg'

  ];
  form = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    projectList: new FormControl(),
    roleList: new FormControl()
  });
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private userService: UserService,
    private roleService: RoleService) {
    this.user = data.user;
    this.purpose = data.purpose;
  }

  ngOnInit(): void {
    if (this.purpose === 'Edit') {
      this.getUserById();
      this.getAllProject();
      this.getAllRole();
      this.getProjectList();
      this.getRoleList();
    }
  }

  getAllProject(): void {
    this.projectService.getAll().subscribe(data => {
      this.projectList = data;
    });
  }
  getUserById(): void {
    this.userService.getById(this.user.userId).subscribe(data => {
      this.form.get('firstName')?.setValue(data.firstName);
      this.form.get('lastName')?.setValue(data.lastName);
      this.form.get('email')?.setValue(data.email);
      this.form.get('username')?.setValue(data.username);
    });
  }

  getProjectList(): void {
    this.userService.getProjectListByUserId(this.user.userId).subscribe(data => {
      this.form.get('projectList')?.setValue(data);
    });
  }

  getRoleList(): void {
    this.userService.getRoleListByUserId(this.user.userId).subscribe(data => {
      this.form.get('roleList')?.setValue(data);
    });
  }

  compareProject(project1: any, project2: any): boolean {
    return project1.projectId === project2.projectId;
  }


  getAllRole(): void {
    this.roleService.getAll().subscribe(data => {
      this.roleList = data;
    });
  }

  compareRole(role1: any, role2: any): boolean {
    return role1.roleId === role2.roleId;
  }

  randomPhoto(): string {
    let result = '';
    result = this.photoList[Math.floor(Math.random() * (this.photoList.length + 1))];
    return result;
  }

  save(): void {
    const form = this.form.value;
    const projectList: any[] = this.form.get('projectList')?.value;
    const roleList: any[] = this.form.get('roleList')?.value;



    if (this.form.valid) {
      if (this.purpose === 'Add') {
        form.profPic = this.randomPhoto();
        this.userService.save(form).subscribe(data => {
          this.close();
        });
      } else {
        form.userId = this.user.userId;
        this.userService.update(form).subscribe(data => {
          this.close();
        });
        if (projectList.length > 0) {
          this.userService.saveProjectList(this.user.userId, projectList).subscribe(data => {
            this.close();
          });
        }
        if (roleList.length > 0) {
          this.userService.saveRoleList(this.user.userId, roleList).subscribe(data => {
            this.close();
          });
        }
      }
    }
  }

  close(): void {
    this.dialogRef.close(true);
  }

}
