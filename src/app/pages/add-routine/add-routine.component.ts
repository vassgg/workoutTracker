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
  workoutName = new FormControl('');
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
      console.log('submitted: ' + this.submittedExercises.length);
      if (this.submittedExercises.length > 0) {
        this.workoutService.insertWorkout(
          this.workoutName.value ? this.workoutName.value : 'workout',
          this.currentUser.uid,
          this.submittedExercises
        ).then(_ => {
          this.router.navigateByUrl('/home');
        });
      } else {
        this.response = "Can't save workout!";
      }
    }, 1000);
  }

  pushSubmittedExercise(exercise: Exercise) {
      this.submittedExercises.push(exercise);
  }

  ngOnInit(): void {
    this.fetchExercises();
  }

  loadImage(imgUrl: string){
    return this.workoutService.loadImg(imgUrl).subscribe(img => {
      return img;
    })
  }
}
