import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MysqlMetricsService {
  getSQL_db_state_test1() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getMysqlStatus() : Observable<any>{
    return this.http.get(`${this.apiUrl}/mysql/status`);
  }
  get_mysql_errors() : Observable<any>{
    return this.http.get(`${this.apiUrl}/mysql/errors`);
  }
}

