import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http: HttpClient) { }


  save(task: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/task/`, task);
  }

  delete(taskId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/task/` + taskId);
  }

  getAllByUserId(userList: any[], projectId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/task/` + userList + '/' + projectId + `/taskList`);
  }
}
