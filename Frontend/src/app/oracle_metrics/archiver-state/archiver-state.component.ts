import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { OracleMetricsService } from 'src/app/services/oracle-metrics.service';

@Component({
  selector: 'app-archiver-state',
  templateUrl: './archiver-state.component.html',
  styleUrls: ['./archiver-state.component.scss']
})
export class ArchiverStateComponent implements OnInit {

  constructor(private oracleService: OracleMetricsService) {}

  // Variables pour Archiver State
  chartDataArchiver: any;
  labelDataArchiver: string[] = [];
  boundDataArchiver: number[] = [];

  // Variables pour Lock Rate
  chartDataLock: any;
  labelDataLock: string[] = [];
  boundDataLock: number[] = [];

  // ViewChild pour les graphiques
  @ViewChild('archiverStateChart', { static: false }) archiverStateChartEl!: ElementRef;
  @ViewChild('lockRateChart', { static: false }) lockRateChartEl!: ElementRef;

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.loadArchiverState();
    this.loadLockRate();
  }

  loadArchiverState(): void {
    this.oracleService.get_archiver_state().subscribe((result: any) => {
      this.chartDataArchiver = result;
      if (this.chartDataArchiver != null) {
        // Extract and sort data by timestamp
        this.chartDataArchiver.sort((a: any, b: any) => {
          const timestampA = new Date(a._source['Last Check']);
          const timestampB = new Date(b._source['Last Check']);
          return timestampA.getTime() - timestampB.getTime();
        });

        // Clear previous data
        this.labelDataArchiver = [];
        this.boundDataArchiver = [];

        // Process sorted data
        let previousHourMinute: string | null = null;
        for (let i = 0; i < this.chartDataArchiver.length; i++) {
          const source = this.chartDataArchiver[i]._source;
          if (source) {
            const lastCheck = new Date(source['Last Check']);
            const hourMinute = `${lastCheck.getHours()}:${lastCheck.getMinutes()}`;

            // Check if hourMinute has already been added to labelDataArchiver
            if (hourMinute !== previousHourMinute) {
              this.labelDataArchiver.push(hourMinute);
              this.boundDataArchiver.push(source['Last Value']);
            }
            previousHourMinute = hourMinute;
          }
        }
        const explanationArchiver = "1 : L'archivage est actif. 0 : L'archivage n'est pas actif.";
        this.renderChart(this.archiverStateChartEl.nativeElement, 'Archiver State', this.labelDataArchiver, this.boundDataArchiver, explanationArchiver);
      }
    });
  }

  loadLockRate(): void {
    this.oracleService.get_lock_rate().subscribe((result: any) => {
      this.chartDataLock = result;
      if (this.chartDataLock != null) {
        // Extract and sort data by timestamp
        this.chartDataLock.sort((a: any, b: any) => {
          const timestampA = new Date(a._source['Last Check']);
          const timestampB = new Date(b._source['Last Check']);
          return timestampA.getTime() - timestampB.getTime();
        });

        // Clear previous data
        this.labelDataLock = [];
        this.boundDataLock = [];

        // Process sorted data
        let previousHourMinute: string | null = null;
        for (let i = 0; i < this.chartDataLock.length; i++) {
          const source = this.chartDataLock[i]._source;
          if (source) {
            const lastCheck = new Date(source['Last Check']);
            const hourMinute = `${lastCheck.getHours()}:${lastCheck.getMinutes()}`;

            // Check if hourMinute has already been added to labelDataLock
            if (hourMinute !== previousHourMinute) {
              this.labelDataLock.push(hourMinute);
              this.boundDataLock.push(source['Last Value']);
            }
            previousHourMinute = hourMinute;
          }
        }
        const explanationLockRate = "0 : Aucune session n'est en attente de verrouillage. >0 : Nombre de sessions en attente de verrouillage.";
        this.renderChart(this.lockRateChartEl.nativeElement, 'Lock Rate', this.labelDataLock, this.boundDataLock, explanationLockRate);
      }
    });
  }

  renderChart(canvas: HTMLCanvasElement, label: string, labelData: string[], mainData: number[], explanation: string = '') {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labelData,
        datasets: [{
          label: `${label}`,
          data: mainData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
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
            display: true,
            text: `${label} Chart`,
            padding: {
              top: 10,
              bottom: 30
            }
          },
          subtitle: {
            display: !!explanation,
            text: explanation
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          }
        },
      }
    });
  }
}
