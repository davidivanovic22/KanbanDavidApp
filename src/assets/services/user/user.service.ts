import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/user/`);
  }

  save(user: any): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/user`, user);
  }

  update(user: any): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/user`, user);
  }

  updateRecordStatus(userId: number, recordStatus: number): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/user/` + userId + `/` + recordStatus, {});
  }

  getById(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/user/` + userId);
  }

  getProjectListByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/user/` + userId + `/projectList`, { responseType: 'json' });
  }

  getRoleListByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/user/` + userId + `/roleList`, { responseType: 'json' });
  }

  saveRoleList(userId: number, roleList: any[]): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/user/` + userId + `/roleList`, roleList);
  }

  saveProjectList(userId: number, projectList: any[]): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/user/` + userId + `/projectList`, projectList);
  }

}
