import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule, } from '@angular/forms'; // Add this line
// import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MemoryComponent } from './sql_server_metrics/memory/memory.component';
import { DbStateComponent } from './sql_server_metrics/db-state/db-state.component';
import { PgaComponent } from './oracle_metrics/pga/pga.component';
import { SgaComponent } from './oracle_metrics/sga/sga.component';
import { TablespacesComponent } from './oracle_metrics/tablespaces/tablespaces.component';
import { BaseChartDirective } from 'ng2-charts';
import { InstanceStatusComponent } from './oracle_metrics/instance-status/instance-status.component';
import { LockRateComponent } from './oracle_metrics/lock-rate/lock-rate.component';
import { ArchiverStateComponent } from './oracle_metrics/archiver-state/archiver-state.component';
// import { ChartsModule } from 'ng2-charts';
// import {HighchartsChartModule} from '/highcharts-angular package'
import { HighchartsChartModule } from 'highcharts-angular';
import { ErrorsComponent } from './errors/errors.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    MemoryComponent,
    DbStateComponent,
    PgaComponent,
    SgaComponent,
    TablespacesComponent,
    InstanceStatusComponent,
    LockRateComponent,
    ArchiverStateComponent,
    ErrorsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
        // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTreeModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, // Add this line
    // CollapseModule,
    // CollapseModule.forRoot(),
    MatExpansionModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    BaseChartDirective,
    // ChartsModule,
    HighchartsChartModule,
    MatTableModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
