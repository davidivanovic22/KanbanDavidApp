import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Label } from 'src/@types/entity/Label';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Label[]> {
    return this.http.get<Label[]>(`${environment.baseUrl}/label`, { responseType: 'json' });
  }

}
