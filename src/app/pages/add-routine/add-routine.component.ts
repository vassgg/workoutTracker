import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WorkoutService } from '../../shared/services/workout.service';
import { Exercise } from '../../shared/models/Exercise';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrl: './add-routine.component.scss',
})
export class AddRoutineComponent implements OnInit {
  constructor(private workoutService: WorkoutService, private router: Router) {}
  routineTitle = new FormControl('');
  note = new FormControl('');
  reps = new FormControl('');
  weight = new FormControl('');
  selectedOption: number = 1;
  exercises: Array<Exercise> = [];
  addedExercises: Array<Exercise> = [];
  submitted = false;
  submittedExercises: Array<Exercise> = [];
  currentUser = JSON.parse(localStorage.getItem('user') as string);
  response = '';

  fetchExercises() {
    this.workoutService
      .getExercises()
      .valueChanges()
      .subscribe((data) => {
        data.map((exercise: Exercise) => {
          if (!this.addedExercises.includes(exercise)) {
            this.exercises.push(exercise);
          }
        });
      });
  }

  removeExercise(exercise: Exercise) {
    this.exercises.push(exercise);
    this.addedExercises = this.addedExercises.filter(
      (prevExercise) => exercise.name !== prevExercise.name
    );
  }

  addExercise(exercise: Exercise) {
    this.addedExercises.push({ ...exercise, sets: [{ weight: 0, reps: 0 }] });
    this.exercises = this.exercises.filter(
      (prevExercise) => exercise.name !== prevExercise.name
    );
  }

  submitWorkout() {
    this.submitted = true;
    setTimeout(() => {
      if (this.submittedExercises.length > 0) {
        this.workoutService.insertWorkout(
          this.currentUser.uid,
          this.submittedExercises
        );
        this.router.navigate(['/']);
      } else {
        this.response = "Can't save workout!";
      }
    }, 1000);
  }

  pushSubmittedExercise(exercise: Exercise) {
    if (exercise.sets && exercise.sets.length > 0) {
      this.submittedExercises.push(exercise);
    }
  }

  ngOnInit(): void {
    this.fetchExercises();
  }
}
