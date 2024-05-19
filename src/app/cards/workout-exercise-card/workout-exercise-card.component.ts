import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AddRoutineRoutingModule } from '../../pages/add-routine/add-routine-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Exercise } from '../../shared/models/Exercise';
import { Set } from '../../shared/models/Set';
import { SetCardComponent } from '../set-card/set-card.component';

@Component({
  selector: 'app-workout-exercise-card',
  standalone: true,
  imports: [
    CommonModule,
    AddRoutineRoutingModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    SetCardComponent,
  ],
  templateUrl: './workout-exercise-card.component.html',
  styleUrl: './workout-exercise-card.component.scss',
})
export class WorkoutExerciseCardComponent implements OnChanges {
  constructor(private formBuilder: FormBuilder) {}
  @Input() name: string = '';
  @Input() primaryMuscleGroup: string = '';
  @Input() sets: Array<Set> | undefined = [];
  @Output() removeRequest = new EventEmitter<Exercise>();
  @Input() submitted = false;
  @Output() workout: Array<Exercise> = [];
  submittedSets: Array<Set> = [];
  @Output() submittedExercise = new EventEmitter<Exercise>();

  loadedImage?: string;

  workoutForm = this.formBuilder.group({
    note: [''],
  });

  removeExercise(exercise: Exercise) {
    this.removeRequest.emit(exercise);
  }

  addSetToExercise() {
    this.sets?.push({ weight: 0, reps: 0 });
  }

  removeSet(index: number) {
    this.sets?.splice(index, 1);
    console.log(index);
  }

  pushExercise(
    name: string,
    sets: Array<Set>,
    primaryMuscleGroup: string,
    note?: string
  ) {
    this.submittedExercise.emit({
      note: note,
      name: name,
      sets: sets,
      primaryMuscleGroup: primaryMuscleGroup,
    });
  }

  pushSet(set: Set) {
    this.submittedSets.push(set);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['submitted'].currentValue === true) {
      let note = this.workoutForm.value.note;
      if (note == null) {
        note = undefined;
      }
      
      
      this.pushExercise(
        this.name,
        this.submittedSets,
        this.primaryMuscleGroup,
        note
      );
    }
  }
}
