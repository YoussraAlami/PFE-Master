import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { sqlserverMetricsService } from 'src/app/services/sqlserver-metrics.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {
  constructor(private sqlserverservice: sqlserverMetricsService) {}
  
  chartdata: any;
  labeldata: string[] = [];
  realdata: number[] = [];
  colordata: string[] = [];

  dbStateChartData: any;
  dbStateLabelData: string[] = [];
  dbStateRealData: number[] = [];

  sideBarOpen = true;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.fetchMemoryData();
    this.fetchDBStateData();
  }

  fetchMemoryData(): void {
    this.sqlserverservice.getSQL_Memory().subscribe(result => {
      this.chartdata = result;
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          const source = this.chartdata[i]._source;
          if (source) {
            const lastCheck = source['Last Check']; // Assuming source['Last Check'] is in the format "YYYY-MM-DD HH:mm:ss"
            const hour = lastCheck.split(' ')[1]; // Extracting only the hour part
            this.labeldata.push(hour); // Pushing only the hour part into labelData array
            const lastValueMB = parseFloat(source['Last Value']) / (1024 * 1024); // Use parseFloat to convert the string to a number
            this.realdata.push(lastValueMB);
          }
        }
        this.RenderMemoryChart(this.labeldata, this.realdata);
      }
    });
  }

  fetchDBStateData(): void {
    this.sqlserverservice.getSQL_db_state_test1().subscribe(result => {
      this.dbStateChartData = result;
      if (this.dbStateChartData != null) {
        for (let i = 0; i < this.dbStateChartData.length; i++) {
          const source = this.dbStateChartData[i]._source;
          if (source) {
            const lastCheck = source['Last Check']; // Assuming source['Last Check'] is in the format "YYYY-MM-DD HH:mm:ss"
            const hour = lastCheck.split(' ')[1]; // Extracting only the hour part
            this.dbStateLabelData.push(hour); // Pushing only the hour part into labelData array
            this.dbStateRealData.push(Number(source['Last Value']));
          }
        }
        this.RenderDBStateChart(this.dbStateLabelData, this.dbStateRealData);
      }
    });
  }

  RenderMemoryChart(labeldata: any, maindata: any) {
    const memoryChart = new Chart("linechart", {
      type: 'line',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'SQLServer Total Memory',
          data: maindata,
          backgroundColor: 'rgba(54, 162, 235, 0.2)', // Couleur bleu avec transparence
          borderColor: 'rgba(54, 162, 235, 1)', // Couleur bleu
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Display the latest memory usage
    if (maindata.length > 0) {
      const latestMemoryUsage = maindata[maindata.length - 1];
      const latestMemoryUsageElement = document.getElementById('latestMemoryUsage');
      if (latestMemoryUsageElement) {
        latestMemoryUsageElement.innerText = `Current Memory Usage: ${latestMemoryUsage.toFixed(2)} MB`;
      }
    }
  }

  RenderDBStateChart(labeldata: any, maindata: any) {
    const dbStateChart = new Chart("dbstatechart", {
      type: 'line',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'SQLServer DB State',
          data: maindata,
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur verte avec transparence
          borderColor: 'rgba(75, 192, 192, 1)', // Couleur verte
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
