import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Workout } from '../../shared/models/Workout';
import { WorkoutService } from '../../shared/services/workout.service';
import { getAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  user = JSON.parse(localStorage.getItem('user') as string);
  workouts?: Array<Workout> = [];
  workoutIds: string[] = [];
  subscriptions: Subscription = new Subscription();
  
  constructor(private userService: UserService, private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService.getUser(this.user.uid).subscribe(user => {
        this.workoutIds = user?.follows as string[];
        this.workoutIds.push(this.user.uid);
        
        
          this.workoutIds.map(currentId => {
            this.subscriptions.add(
              this.workoutService.getWorkoutByUser(currentId).subscribe(workout => {
                
                if (this.workouts) {
                  this.workouts = this.mergeWorkouts(this.workouts, workout);
                  this.workouts = this.sortWorkoutsByDate(this.workouts);
                }
              })
            );
          });
      

      })
    );
  }

  ngOnDestroy(): void {
    console.log('anyadat');
    
    this.subscriptions.unsubscribe();
    this.workoutIds = [];
    this.workouts = [];
  }

  sortWorkoutsByDate(workouts: Workout[]): Workout[] {
    return workouts.sort((a, b) => b.insertDate.toDate().getTime() - a.insertDate.toDate().getTime());
  }

  mergeWorkouts(workouts1: Workout[], workouts2: Workout[]) {
    return [...workouts1, ...workouts2];
  }
}
