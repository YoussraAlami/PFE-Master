import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OracleMetricsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  //PGA
  get_pga_bound() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/pga/global_memory_bound`);
  }
  get_pga_allocated() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/pga/total_allocated`);
  }
  get_pga_freeable() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/pga/total_freeable`);
  }
  get_pga_inuse() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/pga/total_inuse`);
  }
  //SGA
  get_sga_buffer_cache() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/sga/buffer_cache`);
  }
  get_sga_fixed() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/sga/fixed`);
  }
  get_sga_log_buffer() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/sga/log_buffer`);
  }
  get_sga_shared_pool() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/sga/shared_pool`);
  }
  //TABLESPACES
  //SYSAUX Free bytes
  get_tbs_sysaux() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/free_SYSAUX`);
  }
  //SYSAUX Allocated  bytes
  get_tbs_allocated_sysaux(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/allocated_SYSAUX`);
  }
  //SYSAUX Used bytes
  get_tbs_used_sysaux(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/used_SYSAUX`);
  }

  //SYSTEM Free bytes
  get_tbs_system() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/free_SYSTEM`);
  }
  // SYSTEM Allocated bytes
  get_tbs_allocated_system(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/allocated_SYSTEM`);
  }
  // SYSTEM Used bytes
  get_tbs_used_system(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/used_SYSTEM`);
  }
  //TEMP Free bytes
  get_tbs_temp() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/free_TEMP`);
  }
   //TEMP Allocated bytes
   get_tbs_allocated_temp() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/allocated_TEMP`);
  }
  //TEMP Used bytes
  get_tbs_used_stemp() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/used_TEMP`);
  }
  //UNDOtbs1 Free bytes
  get_tbs_undotbs1() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/free_UNDOTBS1`);
  }
//UNDOtbs1 Allocated bytes
get_tbs_allocated_undotbs1(): Observable<any> {
  return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/allocated_UNDOTBS1`);
}
//UNDOtbs1 Used bytes
get_tbs_used_undotbs1(): Observable<any> {
  return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/used_UNDOTBS1`);
}

  //USERS Free bytes
  get_tbs_users() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/free_USERS`);
  }
   //USERS Allocated bytes
   get_tbs_allocated_users(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/allocated_USERS`);
  }
  //USERS Used bytes
  get_tbs_used_users(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metrics/oracle/tbs/used_USERS`);
  }

  //INSTANCE STATUS
  get_instance_status() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/instance_status`);
  }
  //LOCK RATE 
  get_lock_rate() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/lock_rate`);
  }
  //ARCHIVER STATE
  get_archiver_state() : Observable<any>{
    return this.http.get(`${this.apiUrl}/metrics/oracle/archiver_state`);
  }
  //Errors
   get_oracle_errors() : Observable<any>{
    return this.http.get(`${this.apiUrl}/oracle/errors`);
  }

}
