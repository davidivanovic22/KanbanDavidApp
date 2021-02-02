import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/status`, { responseType: 'json' });
  }

  getAllWithoutDuplicate(projectId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/status/` + projectId + `/withoutDuplicate`);
  }

  getByName(name: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/status/` + name, { responseType: 'json' });
  }

  getById(statusId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/status/` + statusId, { responseType: 'json' });
  }

  saveStatusTaskDTO(statusTaskDTO: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/status/statusTaskDTO`, statusTaskDTO, {});
  }

  save(status: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/status`, status, {});
  }

}
