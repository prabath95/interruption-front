import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterruptionScheduleRoutingModule } from './interruption-schedule-routing.module';
import { InterruptionScheduleComponent } from './interruption-schedule.component';
import { CreateComponent } from './create/create.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { UpdateComponent } from './update/update.component';
import { HasPermissionsModule } from '../has-permissions/has-permissions.module';

@NgModule({
  declarations: [
    InterruptionScheduleComponent,
    CreateComponent,
    UpdateComponent,
  ],
  imports: [
    HasPermissionsModule,
    CommonModule,
    InterruptionScheduleRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatPaginatorModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
  ],
})
export class InterruptionScheduleModule {}
