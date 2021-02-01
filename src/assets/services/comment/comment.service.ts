import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  //#region Task

  //#endregion

  save(comment: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/comment`, comment);
  }

  getAllCommentByTaskId(taskId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.baseUrl}/comment/` + taskId + `/commentListByTaskId`, { responseType: 'json' });
  }

}
