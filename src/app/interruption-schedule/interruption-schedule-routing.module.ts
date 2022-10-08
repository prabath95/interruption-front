import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterruptionScheduleComponent } from './interruption-schedule.component';
import { AuthGuard } from '../utils/auth.guard';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view',
    pathMatch: 'full',
  },
  {
    path: 'view',
    component: InterruptionScheduleComponent,
    data: { permission: 'view' },
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'update',
    component: UpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterruptionScheduleRoutingModule {}
