import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OracleMetricsService } from 'src/app/services/oracle-metrics.service';
import HC_more from 'highcharts/highcharts-more';
import HC_solidGauge from 'highcharts/modules/solid-gauge';
import HC_exporting from 'highcharts/modules/exporting';

import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

HC_more(Highcharts);
HC_solidGauge(Highcharts);
HC_exporting(Highcharts);

Chart.register(...registerables);

@Component({
  selector: 'app-pga',
  templateUrl: './pga.component.html',
  styleUrls: ['./pga.component.scss']
})
export class PgaComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptionsBound: Highcharts.Options = {};
  chartOptionsAllocated: Highcharts.Options = {};
  chartOptionsFreeable: Highcharts.Options = {};
  chartOptionsInUse: Highcharts.Options = {};
  chartOptionsDonut: Highcharts.Options = {};

  chartDataBound: any;
  chartDataAllocated: any;
  chartDataFreeable: any;
  chartDataInUse: any;

  labelData: string[] = [];
  boundData: number[] = [];
  allocatedData: number[] = [];
  freeableData: number[] = [];
  inuseData: number[] = [];

  donutChart: any;

  sideBarOpen = true;

  constructor(private oracleService: OracleMetricsService) {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.oracleService.get_pga_bound().subscribe(result => {
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
            this.boundData.push(lastValueMB);
          }
        }
        this.renderChartJSLineChart('linechart-bound', 'PGA Bound', this.labelData, this.boundData);
      }
    });

    this.oracleService.get_pga_allocated().subscribe(result => {
      this.chartDataAllocated = result;
      if (this.chartDataAllocated != null) {
        for (let i = 0; i < this.chartDataAllocated.length; i++) {
          const source = this.chartDataAllocated[i]._source;
          if (source) {
            const lastValueMB = parseFloat(source['Last Value']) / (1024 * 1024);
            this.allocatedData.push(lastValueMB);
          }
        }
        this.renderChartJSLineChart('linechart-allocated', 'PGA Allocated', this.labelData, this.allocatedData);
      }
    });

    this.oracleService.get_pga_freeable().subscribe(result => {
      this.chartDataFreeable = result;
      if (this.chartDataFreeable != null) {
        for (let i = 0; i < this.chartDataFreeable.length; i++) {
          const source = this.chartDataFreeable[i]._source;
          if (source) {
            const lastValueMB = parseFloat(source['Last Value']) / (1024 * 1024);
            this.freeableData.push(lastValueMB);
          }
        }
        this.renderChartJSLineChart('linechart-freeable', 'PGA Freeable', this.labelData, this.freeableData);
      }
    });

    this.oracleService.get_pga_inuse().subscribe(result => {
      this.chartDataInUse = result;
      if (this.chartDataInUse != null) {
        for (let i = 0; i < this.chartDataInUse.length; i++) {
          const source = this.chartDataInUse[i]._source;
          if (source) {
            const lastValueMB = parseFloat(source['Last Value']) / (1024 * 1024);
            this.inuseData.push(lastValueMB);
          }
        }
        this.renderChartJSLineChart('linechart-inuse', 'PGA In Use', this.labelData, this.inuseData);
        this.renderDonutChart();
      }
    });
  }

  renderChartJSLineChart(chartId: string, label: string, labelData: string[], mainData: number[]) {
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

  renderDonutChart() {
    this.Highcharts.chart('donutchart-pga', {
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
        name: 'PGA',
        data: [
          { name: 'PGA Bound', y: this.boundData[this.boundData.length - 1] },
          { name: 'PGA Allocated', y: this.allocatedData[this.allocatedData.length - 1] },
          { name: 'PGA Freeable', y: this.freeableData[this.freeableData.length - 1] },
          { name: 'PGA In Use', y: this.inuseData[this.inuseData.length - 1] }
        ],
        type: 'pie'
      }]
    } as Highcharts.Options);
  }
}
