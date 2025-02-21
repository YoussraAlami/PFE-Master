import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class sqlserverMetricsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getSQL_Memory() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/mssql/Total_server_memory`);
  }
  getSQL_db_state_test1() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/mssql/DB_state_test1`);
  }
  getSQL_db_state_test2() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/mssql/DB_state_test2`);
  }
  get_mssql_errors() : Observable<any>{
    return this.http.get(`${this.apiUrl}/mssql/errors`);
  }
}
