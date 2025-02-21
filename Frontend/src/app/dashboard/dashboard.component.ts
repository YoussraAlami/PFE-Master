import { Component, OnInit, OnDestroy } from '@angular/core';
import { OracleMetricsService } from '../services/oracle-metrics.service';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Variables pour SGA
  sgaBufferCacheData: number = 0;
  sgaFixedData: number = 0;
  sgaLogBufferData: number = 0;
  sgaSharedPoolData: number = 0;

  // Variables pour PGA
  pgaBoundData: number = 0;
  pgaAllocatedData: number = 0;
  pgaFreeableData: number = 0;
  pgaInUseData: number = 0;

  // Subscriptions pour se désabonner lors de la destruction du composant
  private subscriptions: Subscription[] = [];

  constructor(private oracleService: OracleMetricsService) {}

  ngOnInit(): void {
    this.loadSGAData();
    this.loadPGAData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadSGAData(): void {
    this.subscriptions.push(
      this.oracleService.get_sga_buffer_cache().subscribe(result => {
        if (result && result.length > 0) {
          const lastValueMB = parseFloat(result[result.length - 1]._source['Last Value']) / (1024 * 1024);
          this.sgaBufferCacheData = lastValueMB;
          this.renderSGADonutChart();
        }
      })
    );

    this.subscriptions.push(
      this.oracleService.get_sga_fixed().subscribe(result => {
        if (result && result.length > 0) {
          const lastValueMB = parseFloat(result[result.length - 1]._source['Last Value']) / (1024 * 1024);
          this.sgaFixedData = lastValueMB;
          this.renderSGADonutChart();
        }
      })
    );

    this.subscriptions.push(
      this.oracleService.get_sga_log_buffer().subscribe(result => {
        if (result && result.length > 0) {
          const lastValueMB = parseFloat(result[result.length - 1]._source['Last Value']) / (1024 * 1024);
          this.sgaLogBufferData = lastValueMB;
          this.renderSGADonutChart();
        }
      })
    );

    this.subscriptions.push(
      this.oracleService.get_sga_shared_pool().subscribe(result => {
        if (result && result.length > 0) {
          const lastValueMB = parseFloat(result[result.length - 1]._source['Last Value']) / (1024 * 1024);
          this.sgaSharedPoolData = lastValueMB;
          this.renderSGADonutChart();
        }
      })
    );
  }

  renderSGADonutChart(): void {
    const sgaChartOptions: Highcharts.Options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'SGA Distribution'
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
        type: 'pie',
        name: 'SGA',
        data: [
          { name: 'SGA Buffer Cached', y: this.sgaBufferCacheData },
          { name: 'SGA Fixed', y: this.sgaFixedData },
          { name: 'SGA Log Buffer', y: this.sgaLogBufferData },
          { name: 'SGA Shared Pool', y: this.sgaSharedPoolData }
        ]
      }]
    };

    Highcharts.chart('donutchart-sga', sgaChartOptions);
  }

  loadPGAData(): void {
    this.subscriptions.push(
      this.oracleService.get_pga_bound().subscribe(result => {
        if (result && result.length > 0) {
          const lastValueMB = parseFloat(result[result.length - 1]._source['Last Value']) / (1024 * 1024);
          this.pgaBoundData = lastValueMB;
          this.renderPGADonutChart();
        }
      })
    );

    this.subscriptions.push(
      this.oracleService.get_pga_allocated().subscribe(result => {
        if (result && result.length > 0) {
          const lastValueMB = parseFloat(result[result.length - 1]._source['Last Value']) / (1024 * 1024);
          this.pgaAllocatedData = lastValueMB;
          this.renderPGADonutChart();
        }
      })
    );

    this.subscriptions.push(
      this.oracleService.get_pga_freeable().subscribe(result => {
        if (result && result.length > 0) {
          const lastValueMB = parseFloat(result[result.length - 1]._source['Last Value']) / (1024 * 1024);
          this.pgaFreeableData = lastValueMB;
          this.renderPGADonutChart();
        }
      })
    );

    this.subscriptions.push(
      this.oracleService.get_pga_inuse().subscribe(result => {
        if (result && result.length > 0) {
          const lastValueMB = parseFloat(result[result.length - 1]._source['Last Value']) / (1024 * 1024);
          this.pgaInUseData = lastValueMB;
          this.renderPGADonutChart();
        }
      })
    );
  }

  renderPGADonutChart(): void {
    const pgaChartOptions: Highcharts.Options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'PGA Distribution'
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
        type: 'pie',
        name: 'PGA',
        data: [
          { name: 'PGA Bound', y: this.pgaBoundData },
          { name: 'PGA Allocated', y: this.pgaAllocatedData },
          { name: 'PGA Freeable', y: this.pgaFreeableData },
          { name: 'PGA In Use', y: this.pgaInUseData }
        ]
      }]
    };

    Highcharts.chart('donutchart-pga', pgaChartOptions);
  }

  sideBarOpen = true;

  sideBarToggler(): void {
    console.log('Toggle sidebar function called');
    this.sideBarOpen = !this.sideBarOpen;
  }

}
