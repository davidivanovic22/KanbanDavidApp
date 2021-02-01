import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  private user: any | null = null;

  constructor(private http: HttpClient) { }

  getLoggedInUser(): Observable<any> {
    if (this.user) {
      return new Observable<any>(observer => {
        observer.next(this.user);
        observer.complete();
      });
    }
    return this.http.get<any>(`${environment.baseUrl}/user/logged-in`, { responseType: 'json' });
  }

}
