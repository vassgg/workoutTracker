import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Workout } from '../../shared/models/Workout';
import { CommonModule } from '@angular/common';
import { MetricPipe } from '../../shared/pipes/metric.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WorkoutService } from '../../shared/services/workout.service';

@Component({
  selector: 'app-workout-card',
  standalone: true,
  imports: [
    CommonModule,
    MetricPipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './workout-card.component.html',
  styleUrl: './workout-card.component.scss'
})
export class WorkoutCardComponent implements OnInit {
  @Input() workout?: Workout;
  loadedImage?: string;
  userName: string = "";
  currentUser = JSON.parse(localStorage.getItem('user') as string); 
  

  constructor(private userService: UserService, private workoutService: WorkoutService){}

  ngOnInit(): void {
    if (this.workout){
      this.userService.getUser(this.workout?.creatorId).subscribe(user => {
        if (user?.profilePictureUrl){
          this.userName = user.username;
          this.userService.loadProfilePicture(user?.profilePictureUrl).subscribe(data => {
            this.loadedImage = data;
          });
        }
      })
    }
  }

  delete(){
    if (this.workout?.id){
      this.workoutService.delete(this.workout?.id).then(_ =>{
        window.location.reload();
      });
    }
  }
}
