import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MysqlMetricsService } from '../services/mysql-metrics.service';
import { OracleMetricsService } from 'src/app/services/oracle-metrics.service';
import { sqlserverMetricsService } from '../services/sqlserver-metrics.service';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mysqlStatus: any;
  labelData: string[] = [];
  oracleBoundData: number[] = [];

  constructor(
    private mysqlService: MysqlMetricsService,
    private oracleService: OracleMetricsService,
    private sqlServerService: sqlserverMetricsService
  ) {}

  ngOnInit(): void {
    this.mysqlService.getMysqlStatus().subscribe(result => {
      const chartData = this.processChartData(result);
      this.initializeMysqlChart(chartData);
    });

    this.oracleService.get_instance_status().subscribe((result: any) => {
      const oracleChartData = this.processOracleChartData(result);
      this.initializeOracleChart(oracleChartData);
    });

    this.sqlServerService.getSQL_db_state_test1().subscribe((result: any) => {
      const chartData = this.processChartData(result);
      this.initializeSqlServerChart(chartData);
    });
  }

  processChartData(data: any): { labeldata: string[], realdata: number[] } {
    const processedData = this.sortAndFormatData(data);
    const labeldata: string[] = [];
    const realdata: number[] = [];

    processedData.forEach(item => {
      labeldata.push(this.formatTimestamp(item.timestamp));
      realdata.push(Number(item.value));
    });

    return { labeldata, realdata };
  }

  processOracleChartData(data: any): { labeldata: string[], bounddata: number[] } {
    const processedData = this.sortAndFormatData(data);
    const labeldata: string[] = [];
    const bounddata: number[] = [];

    processedData.forEach(item => {
      labeldata.push(this.formatTimestamp(item.timestamp));
      bounddata.push(parseFloat(item.value));
    });

    return { labeldata, bounddata };
  }

  sortAndFormatData(data: any): { timestamp: string, value: string }[] {
    data.sort((a: any, b: any) => {
      const dateA = new Date(a._source['Last Check']).getTime();
      const dateB = new Date(b._source['Last Check']).getTime();
      return dateA - dateB;
    });

    return data.map((item: any) => {
      const lastCheck = item._source['Last Check'];
      const hourMin = lastCheck.split(' ')[1].split(':').slice(0, 2).join(':');
      return {
        timestamp: hourMin,
        value: item._source['Last Value']
      };
    });
  }

  initializeMysqlChart(chartData: { labeldata: string[], realdata: number[] }): void {
    this.createChart('chart1', 'MySQL Status Values', chartData.labeldata, chartData.realdata, '0: database is down, 1: database is up', [0, 1]);
  }

  initializeOracleChart(chartData: { labeldata: string[], bounddata: number[] }): void {
    this.createChart('chart2', 'Oracle Instance Status Values', chartData.labeldata, chartData.bounddata, '0: Instance is offline, 1: Instance is starting up, 2: Instance is shutting down, 3: Instance is online', [0, 1, 2, 3]);
  }

  initializeSqlServerChart(chartData: { labeldata: string[], realdata: number[] }): void {
    this.createChart('chart3', 'SQL Server EmployeeDatabase State Values', chartData.labeldata, chartData.realdata, '0 = Online, 1 = Restoring, 2 = Recovering, 3 = Recovery_pending, 4 = Suspect, 5 = Emergency, 6 = Offline', [0, 1, 2, 3, 4, 5, 6]);
  }

  createChart(canvasId: string, title: string, labels: string[], data: number[], subtitle?: string, yAxisTicks: number[] = []): void {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels, 
        datasets: [{
          label: title,
          data: data,
          borderColor: 'rgba(54, 162, 235, 1)', // Couleur bleu
          backgroundColor: 'rgba(54, 162, 235, 0.2)', // Couleur bleu avec transparence
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: false,
            text: ''
          },
          subtitle: {
            display: !!subtitle,
            text: subtitle
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Value'
            },
            min: Math.min(...yAxisTicks),
            max: Math.max(...yAxisTicks),
            ticks: {
              callback: function(value) {
                if (typeof value === 'number' && yAxisTicks.includes(value)) {
                  return value.toString();
                }
                return '';
              },
              stepSize: 1
            }
          }
        }
      }
    });
  }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  formatTimestamp(timestamp: string): string {
    return timestamp.split(':').slice(0, 2).join(':');
  }
}
