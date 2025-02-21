import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MemoryComponent } from './sql_server_metrics/memory/memory.component';
import { DbStateComponent } from './sql_server_metrics/db-state/db-state.component';
import { PgaComponent } from './oracle_metrics/pga/pga.component';
import { SgaComponent } from './oracle_metrics/sga/sga.component';
import { TablespacesComponent } from './oracle_metrics/tablespaces/tablespaces.component';
import { InstanceStatusComponent } from './oracle_metrics/instance-status/instance-status.component';
import { LockRateComponent } from './oracle_metrics/lock-rate/lock-rate.component';
import { ArchiverStateComponent } from './oracle_metrics/archiver-state/archiver-state.component';
import { ErrorsComponent } from './errors/errors.component';

const routes: Routes = [
  { path: '', redirectTo: 'Dashboard_All', pathMatch: 'full' },
  
  // { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent }, // Ajouter cette ligne pour la route de login
  { path: 'mssql_memory', component: MemoryComponent},
  { path: 'mssql_db_state', component: DbStateComponent},
  { path: 'oracle_pga', component: PgaComponent},
  { path: 'oracle_sga', component: SgaComponent},
  { path: 'oracle_tbs', component: TablespacesComponent},
  { path: 'oracle_inst_status', component: InstanceStatusComponent},
  { path: 'oracle_lock_rate', component: LockRateComponent},
  { path: 'oracle_archiver_state', component: ArchiverStateComponent},
  { path: 'Problems', component: ErrorsComponent},
  { path: 'Dashboard_All', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
