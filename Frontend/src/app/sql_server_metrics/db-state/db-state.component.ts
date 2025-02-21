import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { sqlserverMetricsService } from 'src/app/services/sqlserver-metrics.service';

@Component({
  selector: 'app-db-state',
  templateUrl: './db-state.component.html',
  styleUrls: ['./db-state.component.scss']
})
export class DbStateComponent {
 
  constructor(private sqlserverservice: sqlserverMetricsService) {}
  chartdata: any;

  labeldata: string[] = [];
  realdata: number[] = [];
  colordata: string[] = [];

  sideBarOpen = true;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }
//this.sqlserverservice.getSQL_Memory().subscribe(result =>
  ngOnInit(): void {
    this.sqlserverservice.getSQL_db_state_test1().subscribe(result => {
      this.chartdata = result;
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          const source = this.chartdata[i]._source;
          if (source) {
            // console.log(source);
            const lastCheck = source['Last Check']; // Assuming source['Last Check'] is in the format "YYYY-MM-DD HH:mm:ss"
            const hour = lastCheck.split(' ')[1]; // Extracting only the hour part
            this.labeldata.push(hour); // Pushing only the hour part into labelData array
            // this.labeldata.push(source['Last Check']);
            this.realdata.push(Number(source['Last Value']));
            
          }
        }
        this.RenderChart(this.labeldata, this.realdata);
      }
    });
  }
  
  RenderChart(labeldata:any,maindata:any) {
    const myChart = new Chart("linechart", {
      type: 'line',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'SQLServer db_test1 State',
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
      },
      //new
      
    });
}
}
