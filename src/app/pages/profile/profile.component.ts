import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FormControl } from '@angular/forms';
import { User } from '../../shared/models/User';
import { getAuth } from '@angular/fire/auth';
import { WorkoutService } from '../../shared/services/workout.service';
import { Workout } from '../../shared/models/Workout';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  userObject?: User;
  user = JSON.parse(localStorage.getItem('user') as string);
  loadedImage?: string;
  changedUsername = new FormControl('');
  editing: boolean = false;
  profilePicturePath?: string;
  profilePictureFile?: any;
  toDeletePicture?: string;
  imageAdded: boolean = false;

  workouts?: Workout[];

  constructor(private userService: UserService, private workoutService: WorkoutService){}

  ngOnInit(): void {
    this.userService.getUser(this.user.uid).subscribe(user =>{
      if (user){
        this.userObject = user;
        this.changedUsername.setValue(user.username);
        this.userService.loadProfilePicture(user.profilePictureUrl).subscribe(data =>{
          this.loadedImage = data;
        }, error => {
          console.error(error);
        });
      }
    }, error => {
      console.error(error);
    })
    
    this.getWorkouts();
  }

  getWorkouts(){
    this.workoutService.getWorkoutByUser(this.user.uid).subscribe(datas =>{
      this.workouts = datas;
    });
  }

  onEditProfile(){
    this.editing = true;
  }

  cancelEdit(){
    this.editing = false;
    this.imageAdded = false;
  }

  saveChanges(){
    this.userObject = {
      id: this.userObject?.id as string,
      email: this.userObject?.email as string,
      username: this.changedUsername.value as string,
      profilePictureUrl: this.userObject?.profilePictureUrl as string,
      follows: this.userObject?.follows as string[]
    };
    this.userService.update(this.userObject);
    this.editing = false;
  }

  onFileChange(event: any){
    const file = event.target.files[0]
    if (file) {
      this.profilePicturePath = 'profilepictures/' + file.name;
      this.toDeletePicture = this.userObject?.profilePictureUrl;
      this.profilePictureFile = file;
    };
  }

  addImage(){
    if (this.profilePictureFile){
      this.userService.uploadProfilePicture(this.profilePicturePath as string, this.profilePictureFile);
      this.userObject = {
        id: this.userObject?.id as string,
        email: this.userObject?.email as string,
        username: this.changedUsername.value as string,
        profilePictureUrl: this.profilePicturePath as string,
        follows: this.userObject?.follows as string[]
      };
      this.userService.update(this.userObject);
    }
    this.imageAdded = true;
  }
}
