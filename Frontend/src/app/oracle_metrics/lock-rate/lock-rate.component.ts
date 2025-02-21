import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { OracleMetricsService } from 'src/app/services/oracle-metrics.service';

@Component({
  selector: 'app-lock-rate',
  templateUrl: './lock-rate.component.html',
  styleUrls: ['./lock-rate.component.scss']
})
export class LockRateComponent {
         
  constructor(private oracleService: OracleMetricsService) {}

  chartDataBound: any;
  chartDataAllocated: any;
  chartDataFreeable: any;
  chartDataInUse: any;

  labelData: string[] = [];
  boundData: number[] = [];
  allocatedData: number[] = [];
  freeableData: number[] = [];
  inuseData: number[] = [];

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.oracleService.get_lock_rate().subscribe((result: any) => {
      this.chartDataBound = result;
      if (this.chartDataBound != null) {
        for (let i = 0; i < this.chartDataBound.length; i++) {
          const source = this.chartDataBound[i]._source;
          if (source) {
            const lastCheck = source['Last Check']; // Assuming source['Last Check'] is in the format "YYYY-MM-DD HH:mm:ss"
            const hour = lastCheck.split(' ')[1]; // Extracting only the hour part
            this.labelData.push(hour); // Pushing only the hour part into labelData array
            const lastValueMB = parseFloat(source['Last Value']) / (1024 * 1024); // Use parseFloat to convert the string to a number

            this.boundData.push(source['Last Value']);
          }
        }
        this.renderChart('linechart-Lock-Rate', 'Lock Rate', this.labelData, this.boundData);
      }
    });

   

    
  }

  renderChart(chartId: string, label: string, labelData: string[], mainData: number[]) {
    new Chart(chartId, {
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
        scales: {
          y: {
            beginAtZero: true,
            
          }
        },
        
      }
    });
  }
}
