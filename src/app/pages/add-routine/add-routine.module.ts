import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutineRoutingModule } from './add-routine-routing.module';
import { AddRoutineComponent } from './add-routine.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { WorkoutExerciseCardComponent } from '../../cards/workout-exercise-card/workout-exercise-card.component';

@NgModule({
  declarations: [AddRoutineComponent],
  imports: [
    CommonModule,
    AddRoutineRoutingModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    WorkoutExerciseCardComponent,
  ],
})
export class AddRoutineModule {}
