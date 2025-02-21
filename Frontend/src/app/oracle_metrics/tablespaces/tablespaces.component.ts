import { Component, OnInit } from '@angular/core';
import { OracleMetricsService } from 'src/app/services/oracle-metrics.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Observable } from 'rxjs';

HC_exporting(Highcharts);

@Component({
  selector: 'app-tablespaces',
  templateUrl: './tablespaces.component.html',
  styleUrls: ['./tablespaces.component.scss']
})
export class TablespacesComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  sideBarOpen = true;

  constructor(private oracleService: OracleMetricsService) {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.fetchData('sysaux');
    this.fetchData('system');
    this.fetchData('temp');
    this.fetchData('undotbs1');
    this.fetchData('users'); // Ajouté pour USERS
  }

  fetchData(tbsName: string): void {
    const freeObservable = this.getObservable(tbsName, 'free');
    const allocatedObservable = this.getObservable(tbsName, 'allocated');
    const usedObservable = this.getObservable(tbsName, 'used');

    if (freeObservable && allocatedObservable && usedObservable) {
      freeObservable.subscribe(freeResult => {
        allocatedObservable.subscribe(allocatedResult => {
          usedObservable.subscribe(usedResult => {
            const freeData = this.processData(freeResult);
            const allocatedData = this.processData(allocatedResult);
            const usedData = this.processData(usedResult);

            this.renderDonutChart(`donutchart-tbs_${tbsName}`, tbsName.toUpperCase(), freeData, allocatedData, usedData);
          });
        });
      });
    }
  }

  getObservable(tbsName: string, type: string): Observable<any> | undefined {
    switch (type) {
      case 'free':
        switch (tbsName) {
          case 'sysaux': return this.oracleService.get_tbs_sysaux();
          case 'system': return this.oracleService.get_tbs_system();
          case 'temp': return this.oracleService.get_tbs_temp();
          case 'undotbs1': return this.oracleService.get_tbs_undotbs1();
          case 'users': return this.oracleService.get_tbs_users();
          default: return undefined;
        }
      case 'allocated':
        switch (tbsName) {
          case 'sysaux': return this.oracleService.get_tbs_allocated_sysaux();
          case 'system': return this.oracleService.get_tbs_allocated_system();
          case 'temp': return this.oracleService.get_tbs_allocated_temp();
          case 'undotbs1': return this.oracleService.get_tbs_allocated_undotbs1();
          case 'users': return this.oracleService.get_tbs_allocated_users();
          default: return undefined;
        }
      case 'used':
        switch (tbsName) {
          case 'sysaux': return this.oracleService.get_tbs_used_sysaux();
          case 'system': return this.oracleService.get_tbs_used_system();
          case 'temp': return this.oracleService.get_tbs_used_stemp();
          case 'undotbs1': return this.oracleService.get_tbs_used_undotbs1();
          case 'users': return this.oracleService.get_tbs_used_users();
          default: return undefined;
        }
      default: return undefined;
    }
  }

  processData(result: any): number {
    if (result && result.length > 0) {
      const lastValueMB = parseFloat(result[0]._source['Last Value']) / (1024 * 1024);
      return lastValueMB;
    }
    return 0;
  }

  renderDonutChart(containerId: string, title: string, free: number, allocated: number, used: number) {
    this.Highcharts.chart(containerId, {
      chart: {
        type: 'pie'
      },
      title: {
        text: `Tablespace ${title} Distribution`
      },
      plotOptions: {
        pie: {
          innerSize: '50%',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y:.2f} MB',
            style: {
              color: 'black',
              fontWeight: 'bold'
            }
          }
        }
      },
      series: [{
        name: 'Tablespace',
        data: [
          { name: 'Free Space', y: free },
          { name: 'Allocated Space', y: allocated },
          { name: 'Used Space', y: used }
        ],
        type: 'pie'
      }]
    } as Highcharts.Options);
  }
}
