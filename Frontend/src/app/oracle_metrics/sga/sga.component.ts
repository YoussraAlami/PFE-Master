import { Component, OnInit } from '@angular/core';
import { OracleMetricsService } from 'src/app/services/oracle-metrics.service';
import { Chart } from 'chart.js';

declare var Highcharts: any; // Déclaration de Highcharts

@Component({
  selector: 'app-sga',
  templateUrl: './sga.component.html',
  styleUrls: ['./sga.component.scss']
})
export class SgaComponent implements OnInit {

  chartDataBound: any;
  chartDataAllocated: any;
  chartDataFreeable: any;
  chartDataInUse: any;

  labelData: string[] = [];
  buffer_cacheData: number[] = [];
  fixedData: number[] = [];
  logbufferData: number[] = [];
  sharedPoolData: number[] = [];

  sideBarOpen = true;

  constructor(private oracleService: OracleMetricsService) {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.oracleService.get_sga_buffer_cache().subscribe(result => {
      this.chartDataBound = result;
      if (this.chartDataBound != null) {
        for (let i = 0; i < this.chartDataBound.length; i++) {
          const source = this.chartDataBound[i]._source;
          if (source) {
            const lastCheck = source['Last Check'];
            const lastCheckDate = new Date(lastCheck);
            const hour = lastCheckDate.getHours().toString().padStart(2, '0');
            const minute = lastCheckDate.getMinutes().toString().padStart(2, '0');
            const timeFormatted = `${hour}:${minute}`;
            this.labelData.push(timeFormatted);

            const lastValueMB = parseFloat(source['Last Value']) / (1024 * 1024);
            this.buffer_cacheData.push(lastValueMB);
          }
        }
        this.renderChart('linechart-buffer', 'SGA buffer_cache', this.labelData, this.buffer_cacheData);
      }
    });

    this.oracleService.get_sga_fixed().subscribe(result => {
      this.chartDataAllocated = result;
      if (this.chartDataAllocated != null) {
        for (let i = 0; i < this.chartDataAllocated.length; i++) {
          const source = this.chartDataAllocated[i]._source;
          if (source) {
            const lastValueMB = parseFloat(source['Last Value']) / (1024 * 1024);
            this.fixedData.push(lastValueMB);
          }
        }
        this.renderChart('linechart-fixed', 'SGA Fixed', this.labelData, this.fixedData);
      }
    });

    this.oracleService.get_sga_log_buffer().subscribe(result => {
      this.chartDataFreeable = result;
      if (this.chartDataFreeable != null) {
        for (let i = 0; i < this.chartDataFreeable.length; i++) {
          const source = this.chartDataFreeable[i]._source;
          if (source) {
            const lastValueMB = parseFloat(source['Last Value']) / (1024 * 1024);
            this.logbufferData.push(lastValueMB);
          }
        }
        this.renderChart('linechart-logbuffer', 'SGA Logbuffer', this.labelData, this.logbufferData);
      }
    });

    this.oracleService.get_sga_shared_pool().subscribe(result => {
      this.chartDataInUse = result;
      if (this.chartDataInUse != null) {
        for (let i = 0; i < this.chartDataInUse.length; i++) {
          const source = this.chartDataInUse[i]._source;
          if (source) {
            const lastValueMB = parseFloat(source['Last Value']) / (1024 * 1024);
            this.sharedPoolData.push(lastValueMB);
          }
        }
        this.renderChart('linechart-sharedpool', 'SGA Shared_Pool', this.labelData, this.sharedPoolData);
        this.renderDonutChart(); // Render le donut chart avec Highcharts
      }
    });
  }

  renderChart(chartId: string, label: string, labelData: string[], mainData: number[]) {
    new Chart(chartId, {
      type: 'line',
      data: {
        labels: labelData,
        datasets: [{
          label: `${label} (MB)`,
          data: mainData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: string | number) {
                return value + ' MB';
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(tooltipItem: any) {
                return tooltipItem.dataset.label + ': ' + tooltipItem.raw + ' MB';
              }
            }
          }
        }
      }
    });
  }

  renderDonutChart(): void {
    Highcharts.chart('donutchart-sga', {
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
        name: 'SGA',
        data: [
          { name: 'SGA Buffer Cached', y: this.buffer_cacheData.length > 0 ? this.buffer_cacheData[this.buffer_cacheData.length - 1] : 0 },
          { name: 'SGA Fixed', y: this.fixedData.length > 0 ? this.fixedData[this.fixedData.length - 1] : 0 },
          { name: 'SGA Log Buffer', y: this.logbufferData.length > 0 ? this.logbufferData[this.logbufferData.length - 1] : 0 },
          { name: 'SGA Shared Pool', y: this.sharedPoolData.length > 0 ? this.sharedPoolData[this.sharedPoolData.length - 1] : 0 }
        ]
      }]
    });
  }
}
