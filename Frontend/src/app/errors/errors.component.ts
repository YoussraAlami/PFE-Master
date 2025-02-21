import { Component, OnInit } from '@angular/core';
import { MysqlMetricsService } from '../services/mysql-metrics.service';
import { OracleMetricsService } from '../services/oracle-metrics.service';
import { sqlserverMetricsService } from '../services/sqlserver-metrics.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {
  sideBarOpen = true;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }
  
  displayedColumns: string[] = ['host', 'description', 'timestamp'];
  mysqlErrors: any[] = [];
  oracleErrors: any[] = [];
  mssqlErrors: any[] = [];

  constructor(private mySqlService: MysqlMetricsService,
              private oracleService: OracleMetricsService,
              private msSqlService: sqlserverMetricsService) {}

  ngOnInit() {
    this.loadMysqlErrors();
    this.loadOracleErrors();
    this.loadMssqlErrors();
  }

  loadMysqlErrors() {
    this.mySqlService.get_mysql_errors().subscribe(
      (data: any[]) => {
        this.mysqlErrors = data;
      },
      error => {
        console.error('Error fetching MySQL errors', error);
      }
    );
  }

  loadOracleErrors() {
    this.oracleService.get_oracle_errors().subscribe(
      (data: any[]) => {
        this.oracleErrors = data;
      },
      error => {
        console.error('Error fetching Oracle errors', error);
      }
    );
  }

  loadMssqlErrors() {
    this.msSqlService.get_mssql_errors().subscribe(
      (data: any[]) => {
        this.mssqlErrors = data;
      },
      error => {
        console.error('Error fetching MSSQL errors', error);
      }
    );
  }
}
