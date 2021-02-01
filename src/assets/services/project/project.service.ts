import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/project`, { responseType: 'json' });
  }

  getById(projectId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/project/` + projectId, { responseType: 'json' });
  }

  getStatusList(projectId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/project/` + projectId + `/statusList`, { responseType: 'json' });
  }

  getUserList(projectId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/project/` + projectId + `/userList`, { responseType: 'json' });
  }

  getProjectStatusTaskDTO(projectId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/project/` + projectId + `/projectStatusTaskDTO`, { responseType: 'json' });
  }

  getFilteredProjectStatusTaskDTO(projectId: number, userList: any[]): Observable<any> {
    const users: any = [];
    userList.forEach((user: any) => {
      users.push(user.userId);
    });
    return this.http.get<any>(`${environment.baseUrl}/project/` + projectId + `/` + users, { responseType: 'json' });
  }
  save(project: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/project`, project, {});
  }

  update(project: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/project`, project, {});
  }
  saveStatusList(projectId: number, statusList: any[]): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/project/` + projectId + `/statusList/`, statusList);
  }

  deleteStatusFromListByProjectId(projectId: number, statusId: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/project/statusList/` + projectId + '/' + statusId);
  }

  saveUserList(projectId: number, userList: any[]): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/project/` + projectId + `/userList/`, userList);
  }
}
